import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../../base/auth/auth.module';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';
import { BaseCacheModule } from 'src/base/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], connectionName),
    AuthModule,
    BaseCacheModule,
  ],
  providers: [UserService, SettingService, RoleService],
  controllers: [UserController],
})
export class UserModule {}
