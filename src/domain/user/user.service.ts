import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { Connection, getCustomRepository } from 'typeorm';
import { UserEntityRepository } from './entity/user.entity.repository';

@Injectable()
export class UserService {
  userEntityRepositry;
  constructor(
    @InjectConnection(connectionName) connection: Connection,
    private settingService: SettingService,
  ) {
    this.userEntityRepositry = getCustomRepository(
      UserEntityRepository,
      connection.name,
    );
  }
  url() {
    return this.settingService.db.url;
  }
  async get(id) {
    return await this.userEntityRepositry.findOne({
      id: id,
    });
  }
  async create(body) {
    return await this.userEntityRepositry.insert(body);
  }
}
