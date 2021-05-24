import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [SettingModule, DatabaseModule, AuthModule, CaslModule],
  exports: [SettingModule, DatabaseModule, AuthModule],
})
export class BaseModule {}
