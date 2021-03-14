import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SettingService } from '../setting/setting.service';
import { connectionName } from './database.constant';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private settingService: SettingService) {}
  createTypeOrmOptions(): any {
    return {
      name: connectionName,
      autoLoadEntities: this.settingService.db.entityAutoload,
      subscribers: [],
      dropSchema: false,
      type: 'postgres',
      url: this.settingService.db.url,
      logger: 'advanced-console',
      migrations: [__dirname + '../../database/migrations/*.ts'],
      // entities: this.settingService.db.entityPath,
      cli: {
        migrationsDir: 'src/base/database/migrations/',
      },
    };
  }
}
