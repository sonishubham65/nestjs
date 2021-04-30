import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
  @Get()
  async users() {
    return await this.propertyService.findAll();
  }

  @Get(':id')
  async user(@Param() param) {
    return await this.propertyService.findOne(param.id);
  }

  @Post()
  async create(@Body() body) {
    return await this.propertyService.create({
      ...body,
      user: '81b83657-e685-46c0-b8f0-6144f3686195',
    });
  }
}
