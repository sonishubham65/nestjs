import { BaseEntityRepository } from 'src/base/entity/base.entity.repository';
import { EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserEntityRepository extends BaseEntityRepository<UserEntity> {}
