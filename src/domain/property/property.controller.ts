import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyType } from './entity/property.type.enum';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from '../../base/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';
import { SettingService } from 'src/base/setting/setting.service';
import { PropertyAdd, PropertyList } from './property.dto';
import { v4 as uuid } from 'uuid';
import { Roles } from '../user/user.role.decorator';
import { Role } from '../role/enum.role';
import { RoleGuard } from '../role/role.guard';
import { Action, CaslProperty } from './casl.property';
import { Logger } from 'src/base/logger/logger.decorator';
const storage = new Storage();

@Controller('property')
export class PropertyController {
  bucket;
  bucketName;
  constructor(
    private propertyService: PropertyService,
    private settingService: SettingService,
    private caslProperty: CaslProperty,
  ) {
    this.bucketName = this.settingService.bucket.name;
    this.bucket = storage.bucket(this.bucketName);
  }
  @Get()
  @Roles(Role.User, Role.Admin)
  async properties(@Query() query: PropertyList) {
    console.log(query);
    // return await this.propertyService.findAll(
    //   query.where,
    //   query.order,
    //   query.page,
    //   query.limit,
    // );
  }

  @Get('/:id')
  async property(@Param() param, @Logger() logger) {
    return await this.propertyService.findOne(param.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() body: PropertyAdd, @Logger() logger) {
    return await this.propertyService.create({
      ...body,
      userId: req.user.id,
      type: body.type,
    });
  }

  @Patch('/:id/cover/')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User, Role.Admin)
  @UseInterceptors(FileInterceptor('cover'))
  async cover(
    @Request() req,
    @Param() param,
    @UploadedFile() image: Express.Multer.File,
    @Logger() logger,
  ) {
    const url = await new Promise((resolve, reject) => {
      try {
        const folderName = 'properties/cover';
        const filePath = `${folderName}/${uuid()}-${image.originalname}`;

        // Create a new blob in the bucket and upload the file data.
        const blob = this.bucket.file(filePath);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
          reject(err);
        });

        blobStream.on('finish', async () => {
          try {
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
            resolve(publicUrl);
          } catch (e) {
            reject(e);
          }
        });

        blobStream.end(image.buffer);
      } catch (e) {
        reject(e);
      }
    });
    return await this.propertyService.update(param.id, {
      cover: url,
    });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.ACCEPTED)
  async update(@Body() body, @Param() param, @Request() req, @Logger() logger) {
    const ability = this.caslProperty.createForUser(req.user);
    const property = await this.propertyService.findOne(param.id);
    if (property) {
      if (ability.can(Action.Update, property)) {
        return await this.propertyService.update(property.id, {
          ...body,
          type: PropertyType[body.type],
        });
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User, Role.Admin)
  async delete(@Param() param) {
    return await this.propertyService.delete(param.id);
  }
}
