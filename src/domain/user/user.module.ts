import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../../base/auth/auth.module';
import { AuthService } from 'src/base/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], connectionName), AuthModule],
  providers: [UserService, SettingService],
  controllers: [UserController],
})
export class UserModule {}
