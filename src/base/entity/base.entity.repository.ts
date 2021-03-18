import { BaseEntity } from './base.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BaseEntity)
export abstract class BaseEntityRepository<
  T extends BaseEntity
> extends Repository<T> {}
