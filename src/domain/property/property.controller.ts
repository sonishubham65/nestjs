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
      user: 'dfa5af0c-e118-40e9-ba5a-2825d8c7a5a1',
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
