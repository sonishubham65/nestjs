import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { connectionName } from 'src/base/database/database.constant';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [BaseModule, TypeOrmModule.forFeature([UserEntity], connectionName)],
  providers: [UserService],
})
export class UserModule {}
