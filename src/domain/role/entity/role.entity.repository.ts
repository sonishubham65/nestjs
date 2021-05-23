import { BaseEntityRepository } from '../../../base/entity/base.entity.repository';
import { EntityRepository } from 'typeorm';
import { RoleEntity } from './role.entity';

@EntityRepository(RoleEntity)
export class RoleEntityRepository extends BaseEntityRepository<RoleEntity> {}
