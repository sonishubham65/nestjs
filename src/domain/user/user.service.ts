import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import {
  Connection,
  EntityManager,
  getCustomRepository,
  Transaction,
} from 'typeorm';
import { UserEntityRepository } from './entity/user.entity.repository';

@Injectable()
export class UserService {
  userEntityRepositry;
  constructor(
    @InjectConnection(connectionName) private connection: Connection,
    private settingService: SettingService,
  ) {
    this.userEntityRepositry = getCustomRepository(
      UserEntityRepository,
      connection.name,
    );
  }

  async findAll() {
    return await this.userEntityRepositry.find({
      where: {},
      take: 10,
    });
  }

  async findOne(id) {
    return await this.userEntityRepositry.findOne({
      id: id,
    });
  }

  async findByEmail(email, manager?: EntityManager) {
    return await (manager
      ? manager.getCustomRepository(this.userEntityRepositry)
      : this.userEntityRepositry
    ).findOne(
      {
        email: email,
      },
      {
        select: ['id', 'email', 'password', 'dob'],
      },
    );
  }

  async create(body, manager?: EntityManager) {
    return await (manager
      ? manager.getCustomRepository(this.userEntityRepositry)
      : this.userEntityRepositry
    ).insert(body);
  }

  async delete(id) {
    return await this.userEntityRepositry.softDelete({ id: id });
  }
}
