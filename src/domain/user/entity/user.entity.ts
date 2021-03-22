import { Column, Db, Entity, Index } from 'typeorm';
import { BaseEntity } from 'src/base/entity/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @Index({})
  email: string;

  @Column()
  @Exclude()
  password: string;
}
