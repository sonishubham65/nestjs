import { Module } from '@nestjs/common';
import { DatabaseConfig } from './load/database.config';
import { SettingService } from './setting.service';

@Module({
  providers: [SettingService, DatabaseConfig],
  exports: [SettingService],
})
export class SettingModule {}
