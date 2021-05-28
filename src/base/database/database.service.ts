import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SettingService } from '../setting/setting.service';
import { connectionName } from './database.constant';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private settingService: SettingService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: connectionName,
      autoLoadEntities: this.settingService.db.entityAutoload,
      ...this.settingService.db.typeormconfig(),
    };
  }
}
