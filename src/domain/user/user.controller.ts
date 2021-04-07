import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    this.userService.url();
  }

  @Get()
  async user() {
    return await this.userService.get('54dc4231-f45b-4f88-87e7-37240bbfcdaf');
  }

  @Post()
  async create(@Body() body) {
    return await this.userService.create(body);
  }
}
