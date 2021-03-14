import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingModule } from '../setting/setting.module';
import { SettingService } from '../setting/setting.service';
import { connectionName } from './database.constant';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: connectionName,
      useClass: DatabaseService,
      imports: [SettingModule],
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
