import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SettingService } from 'src/base/setting/setting.service';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../../base/auth/local-auth.guard';
import { AuthService } from 'src/base/auth/auth.service';
import { Logger } from '../../base/logger/logger.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private authService: AuthService,
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
  async create(@Body() body, @Logger() logger) {
    const password = await bcrypt.hash(
      body.password,
      this.settingService.secret.saltRound,
    );
    console.log(`Encrypted password`, { password: password });
    body.password = password;
    logger.log(`Password`, password);
    return await this.userService.create({ ...body });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Logger() logger) {
    logger.error('Error', { a: 1 });
    return this.authService.login(req.user);
  }
}
