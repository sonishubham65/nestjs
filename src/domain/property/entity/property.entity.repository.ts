import { BaseEntityRepository } from '../../../base/entity/base.entity.repository';
import { EntityRepository } from 'typeorm';
import { PropertyEntity } from './property.entity';

@EntityRepository(PropertyEntity)
export class PropertyEntityRepository extends BaseEntityRepository<PropertyEntity> {}
