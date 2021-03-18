import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SettingModule, DatabaseModule],
  exports: [SettingModule, DatabaseModule],
})
export class BaseModule {}
