import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SettingService } from '../setting/setting.service';
import { connectionName } from './database.constant';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private settingService: SettingService) {}
  createTypeOrmOptions(): any {
    console.log(this.settingService.db.sync);
    console.log(`this.settingService.db.sync`, this.settingService.db.sync);
    return {
      name: connectionName,
      autoLoadEntities: this.settingService.db.entityAutoload,
      type: 'postgres',
      url: this.settingService.db.url,
      sync: this.settingService.db.sync,
      logger: 'advanced-console',
      migrations: [__dirname + '../../database/migrations/*.ts'],
      entities: [],
      cli: {
        migrationsDir: 'src/base/database/migrations/',
      },
    };
  }
}
