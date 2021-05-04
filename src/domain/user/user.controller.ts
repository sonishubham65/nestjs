import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async users() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async user(@Param() param) {
    return await this.userService.findOne(param.id);
  }

  @Post()
  async create(@Body() body) {
    //throw new HttpException('Already exists.', HttpStatus.CONFLICT);
    //throw new HttpException({ message: 'Already exists.', a: 1 }, HttpStatus.CONFLICT);
    return await this.userService.create({ ...body });
  }

  @Delete('/:id')
  async delete(@Param() param) {
    return await this.userService.delete(param.id);
  }
}
