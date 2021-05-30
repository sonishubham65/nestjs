import { CacheTTL, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { Connection, EntityManager, getCustomRepository } from 'typeorm';
import { UserEntityRepository } from './entity/user.entity.repository';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  userEntityRepositry;
  constructor(
    @InjectConnection(connectionName) private connection: Connection,
    private settingService: SettingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  @CacheTTL(30)
  async findOne(id) {
    let user = await this.cacheManager.get(`user-${id}`);
    if (!user) {
      user = await this.userEntityRepositry.findOne(id);
      this.cacheManager.set(`user-${id}`, user);
    }
    return user;
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

  async create(logger, body, manager?: EntityManager) {
    return await (manager
      ? manager.getCustomRepository(this.userEntityRepositry)
      : this.userEntityRepositry
    ).insert(body);
  }

  async update(id, body) {
    let user = await this.cacheManager.del(`user-${id}`);
    return await this.userEntityRepositry.update({ id: id }, body);
  }

  async delete(id) {
    let user = await this.cacheManager.del(`user-${id}`);
    return await this.userEntityRepositry.softDelete({ id: id });
  }
}
