import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  ServiceUnavailableException,
  ConflictException,
} from '@nestjs/common';
import { SettingService } from 'src/base/setting/setting.service';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../../base/auth/local-auth.guard';
import { AuthService } from 'src/base/auth/auth.service';
import { Logger } from '../../base/logger/logger.decorator';
import {
  Connection,
  EntityManager,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { RoleService } from '../role/role.service';
import { Role } from '../role/enum.role';
import { connectionName } from 'src/base/database/database.constant';
import { UserAdd } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private authService: AuthService,
    private roleService: RoleService,
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
  @Transaction({ connectionName, isolation: 'SERIALIZABLE' })
  async create(
    @Body() body: UserAdd,
    @Logger() logger,
    @TransactionManager() manager: EntityManager,
  ) {
    const password = await bcrypt.hash(
      body.password,
      this.settingService.secret.saltRound,
    );
    body.password = password;

    let user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new ConflictException('That email address is already registered.');
    }

    user = await this.userService.create({ ...body }, manager);
    const userId = user?.identifiers[0].id;
    await this.roleService.create(userId, Role.User, manager);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Logger() logger) {
    logger.error('Error', { a: 1 });
    return this.authService.login(req.user);
  }
}
