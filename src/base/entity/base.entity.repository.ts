import { BaseEntity } from './base.entity';
import { Repository } from 'typeorm';

export abstract class BaseEntityRepository<
  T extends BaseEntity
> extends Repository<T> {}
