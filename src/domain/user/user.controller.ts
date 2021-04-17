import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    this.userService.url();
  }

  @Get(':id')
  async user(@Param() param) {
    return await this.userService.get(param.id);
  }

  @Post()
  async create(@Body() body) {
    return await this.userService.create(body);
  }
}
