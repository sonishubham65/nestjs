import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PropertyType } from './entity/property.type.enum';
import { PropertyService } from './property.service';
import * as moment from 'moment-timezone';
console.log(`moment.tz()`, moment.tz.guess());
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

  @Post()
  async create(@Body() body) {
    const response = await this.propertyService.create({
      ...body,
      user: '60c8ade1-51d1-4d6e-8d5f-447c9577a546',
      type: PropertyType[body.type],
    });
    const time = moment(response.generatedMaps[0].createdAt).tz(
      'Asia/Calcutta',
    );
    console.log(
      `time`,
      time,
      response.generatedMaps[0].createdAt,
      moment(time).tz('Asia/Calcutta'),
    );
    response.generatedMaps[0].createdAt = moment(time)
      .tz('Asia/Calcutta')
      .format('YYYY-MM-DD HH:mm:ss');
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
