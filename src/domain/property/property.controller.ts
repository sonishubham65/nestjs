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
} from '@nestjs/common';
import { PropertyType } from './entity/property.type.enum';
import { PropertyService } from './property.service';
import * as moment from 'moment-timezone';
import { JwtAuthGuard } from '../../base/auth/jwt-auth.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
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
  async create(
    @Request() req,
    @Body() body,
    @UploadedFile() images: Array<Express.Multer.File>,
    @UploadedFiles() related: Array<Express.Multer.File>,
  ) {
    console.log(`req.user.id`, req.user.id);
    const response = await this.propertyService.create({
      ...body,
      userId: req.user.id,
      type: PropertyType[body.type],
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
