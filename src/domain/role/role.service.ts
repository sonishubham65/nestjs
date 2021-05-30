import { CacheTTL, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { Connection, EntityManager, getCustomRepository } from 'typeorm';
import { RoleEntityRepository } from './entity/role.entity.repository';
import { Cache } from 'cache-manager';

@Injectable()
export class RoleService {
  roleEntityRepositry;
  constructor(
    @InjectConnection(connectionName) private connection: Connection,
    private settingService: SettingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.roleEntityRepositry = getCustomRepository(
      RoleEntityRepository,
      connection.name,
    );
  }

  async findOne(userId, role) {
    return await this.roleEntityRepositry.findOne({
      where: { user: userId },
      take: role,
    });
  }

  @CacheTTL(30)
  async findAll(userId) {
    let roles = await this.cacheManager.get(`roles-${userId}`);
    if (!roles) {
      roles = await this.roleEntityRepositry.find({
        where: { user: userId },
      });
      this.cacheManager.set(`roles-${userId}`, roles);
    }

    return roles;
  }

  async create(userId, role, manager?: EntityManager) {
    // delete the roles from Cache manager
    await this.cacheManager.del(`roles-${userId}`);
    return (manager
      ? manager.getCustomRepository(this.roleEntityRepositry)
      : this.roleEntityRepositry
    ).insert({
      userId: userId,
      role: role,
    });
  }
}
