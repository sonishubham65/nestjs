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
  async create(@Body() body) {
    //throw new HttpException('Already exists.', HttpStatus.CONFLICT);
    //throw new HttpException({ message: 'Already exists.', a: 1 }, HttpStatus.CONFLICT);

    body.password = await bcrypt.hash(
      body.password,
      this.settingService.secret.saltRound,
    );
    return await this.userService.create({ ...body });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
