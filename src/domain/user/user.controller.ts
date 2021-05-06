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
import { SettingService } from 'src/base/setting/setting.service';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private settingService: SettingService,
  ) {}

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

    body.password = await bcrypt.hash(
      body.password,
      this.settingService.secret.saltRound,
    );
    return await this.userService.create({ ...body });
  }

  @Post('/login')
  async login(@Body() body) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new HttpException('User does not exists.', HttpStatus.NO_CONTENT);
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (isMatch) {
      return { message: 'logged in' };
    } else {
      throw new HttpException('Wrong password.', HttpStatus.UNAUTHORIZED);
    }
  }
}
