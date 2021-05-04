import { BaseEntity } from '../../../base/entity/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { PropertyEntity } from '../../../../src/domain/property/entity/property.entity';

@Entity()
@Index(['first_name', 'last_name']) // Multiple column index
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'timestamptz', default: '1950-01-01T00:00:00.000+00:00' })
  dob: Date;

  @Column()
  @Index({ unique: true }) // Unique Column index
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany((type) => PropertyEntity, (property) => property.user)
  properties: PropertyEntity[];
}
