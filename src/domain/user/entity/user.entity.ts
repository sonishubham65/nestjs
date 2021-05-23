import { BaseEntity } from '../../../base/entity/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { PropertyEntity } from '../../../../src/domain/property/entity/property.entity';
import { RoleEntity } from '../../../../src/domain/role/entity/role.entity';

@Entity()
@Index(['first_name', 'last_name']) // Multiple column index
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'timestamptz',
    default: () => `'1950-01-01 00:00:00+00'`,
  })
  dob: Date;

  @Column()
  @Index({ unique: true }) // Unique Column index
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany((type) => PropertyEntity, (property) => property.user)
  properties: PropertyEntity[];

  @OneToMany((role) => RoleEntity, (role) => role.user)
  roles: Promise<RoleEntity[]>;
}
