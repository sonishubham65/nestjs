import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingModule } from '../setting/setting.module';
import { connectionName } from './database.constant';
import { DatabaseService } from './database.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: connectionName,
      useClass: DatabaseService,
      imports: [SettingModule, DatabaseModule],
    }),
  ],
  providers: [],
  exports: [
    TypeOrmModule.forRootAsync({
      name: connectionName,
      useClass: DatabaseService,
      imports: [SettingModule, DatabaseModule],
    }),
  ],
})
export class DatabaseModule {}
