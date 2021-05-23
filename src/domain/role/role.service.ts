import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { Connection, EntityManager, getCustomRepository } from 'typeorm';
import { RoleEntityRepository } from './entity/role.entity.repository';

@Injectable()
export class RoleService {
  roleEntityRepositry;
  constructor(
    @InjectConnection(connectionName) private connection: Connection,
    private settingService: SettingService,
  ) {
    this.roleEntityRepositry = getCustomRepository(
      RoleEntityRepository,
      connection.name,
    );
  }

  async findOne(userId, role) {
    return await this.roleEntityRepositry.findOne({
      where: { userId: userId },
      take: role,
    });
  }

  async create(userId, role, manager?: EntityManager) {
    return (manager
      ? manager.getCustomRepository(this.roleEntityRepositry)
      : this.roleEntityRepositry
    ).insert({
      userId: userId,
      role: role,
    });
  }
}
