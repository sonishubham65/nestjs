import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BaseCacheModule } from './cache/cache.module';

@Module({
  imports: [SettingModule, DatabaseModule, AuthModule, BaseCacheModule],
  exports: [SettingModule, DatabaseModule, AuthModule],
})
export class BaseModule {}
