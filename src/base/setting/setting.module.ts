import { Module } from '@nestjs/common';
import { DatabaseConfig } from './load/database.config';
import { JWTConfig } from './load/jwt.config';
import { RedisConfig } from './load/redis.config';
import { SecretConfig } from './load/secret.config';
import { SettingService } from './setting.service';

@Module({
  providers: [
    SettingService,
    DatabaseConfig,
    JWTConfig,
    SecretConfig,
    RedisConfig,
  ],
  exports: [SettingService, DatabaseConfig],
})
export class SettingModule {}
