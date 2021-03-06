import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseCacheModule } from 'src/base/cache/cache.module';
import { connectionName } from 'src/base/database/database.constant';
import { SettingService } from 'src/base/setting/setting.service';
import { RoleEntity } from './entity/role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity], connectionName),
    BaseCacheModule,
  ],
  controllers: [],
  providers: [RoleService, SettingService],
  exports: [RoleService],
})
export class RoleModule {}
