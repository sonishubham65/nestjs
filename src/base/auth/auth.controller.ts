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
import { LocalAuthGuard } from '../../base/auth/local-auth.guard';
import { UserService } from 'src/domain/user/user.service';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
