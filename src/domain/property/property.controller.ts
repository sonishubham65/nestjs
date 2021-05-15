import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyType } from './entity/property.type.enum';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from '../../base/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';
import { SettingService } from 'src/base/setting/setting.service';
import { PropertyAdd } from './property.dto';
const storage = new Storage();

@Controller('property')
export class PropertyController {
  bucket;
  constructor(
    private propertyService: PropertyService,
    private settingService: SettingService,
  ) {
    console.log(
      `this.settingService.bucket.name`,
      this.settingService.bucket.name,
    );
    this.bucket = storage.bucket(this.settingService.bucket.name);
  }
  @Get()
  async properties() {
    return await this.propertyService.findAll();
  }

  @Get('/:id')
  async property(@Param() param) {
    return await this.propertyService.findOne(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 1 },
      { name: 'related[]', maxCount: 3 },
    ]),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Request() req,
    @Body() body: PropertyAdd,
    @UploadedFile() cover: Array<Express.Multer.File>,
    @UploadedFiles() related: Array<Express.Multer.File>,
  ) {
    console.log(`title`, body.title);
    // console.log(`cover`, cover);
    // console.log(`related`, related);
    // Create a new blob in the bucket and upload the file data.
    // const blob = this.bucket.file(req.file.originalname);
    // const blobStream = blob.createWriteStream();

    // await this.bucket.upload(cover, {
    //   destination: this.settingService.bucket.propertyFolder,
    // });
    const response = await this.propertyService.create({
      ...body,
      userId: req.user.id,
      type: body.type,
    });
    return response;
  }

  @Put('/:id')
  async update(@Body() body, @Param() param) {
    return await this.propertyService.update(param.id, {
      ...body,
      type: PropertyType[body.type],
    });
  }

  @Delete('/:id')
  async delete(@Param() param) {
    return await this.propertyService.delete(param.id);
  }
}
