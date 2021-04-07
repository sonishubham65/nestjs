import { BaseEntity } from '../../../base/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Index(['first_name', 'last_name']) // Multiple column index
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @Index({ unique: true }) // Unique Column index
  email: string;

  @Column({ select: false })
  password: string;
}
