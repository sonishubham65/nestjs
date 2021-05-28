import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { connectionName } from '../../base/database/database.constant';
import { SettingService } from '../../base/setting/setting.service';
import { Connection, getCustomRepository } from 'typeorm';
import { PropertyEntityRepository } from './entity/property.entity.repository';

@Injectable()
export class PropertyService {
  propertyEntityRepositry;
  constructor(
    @InjectConnection(connectionName) connection: Connection,
    private settingService: SettingService,
  ) {
    this.propertyEntityRepositry = getCustomRepository(
      PropertyEntityRepository,
      connection.name,
    );
  }

  async findAll(where = {}, order = { id: 'desc' }, page = 1, limit = 10) {
    limit = Math.min(limit, 100);
    page = Math.max(page, 1);
    const offset = (page - 1) * limit;

    return await this.propertyEntityRepositry.find({
      where: {},
      take: limit,
      offset: offset,
      order: order,
    });
  }

  async findOne(id) {
    return await this.propertyEntityRepositry.findOne({ id });
  }

  async create(body) {
    return await this.propertyEntityRepositry.insert(body);
  }

  async update(id, body) {
    return await this.propertyEntityRepositry.update(
      {
        id: id,
      },
      body,
    );
  }

  async delete(id) {
    return await this.propertyEntityRepositry.softDelete({
      id: id,
    });
  }
}
