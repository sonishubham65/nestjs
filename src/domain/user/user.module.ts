import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionName } from 'src/base/database/database.constant';
import { SettingService } from 'src/base/setting/setting.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntityRepository } from './entity/user.entity.repository';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], connectionName)],
  providers: [UserService, SettingService],
  controllers: [UserController],
})
export class UserModule {}
