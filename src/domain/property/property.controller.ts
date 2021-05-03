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

  @Get(':id')
  async user(@Param() param) {
    return await this.propertyService.findOne(param.id);
  }

  @Post()
  async create(@Body() body) {
    return await this.propertyService.create({
      ...body,
      user: 'd07bbdb4-97e6-4675-8d8b-259d31fb744d',
      type: PropertyType[body.type],
    });
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
