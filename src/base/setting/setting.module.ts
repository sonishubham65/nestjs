import { Module } from '@nestjs/common';
import { DatabaseConfig } from './load/database.config';
import { JWTConfig } from './load/jwt.config';
import { SettingService } from './setting.service';

@Module({
  providers: [SettingService, DatabaseConfig, JWTConfig],
  exports: [SettingService, DatabaseConfig],
})
export class SettingModule {}
