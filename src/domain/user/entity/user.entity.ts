import { BaseEntity } from '../../../base/entity/base.entity';
import { AfterLoad, Column, Entity, Index, OneToMany } from 'typeorm';
import { PropertyEntity } from '../../../../src/domain/property/entity/property.entity';
import { RoleEntity } from '../../../../src/domain/role/entity/role.entity';
import { _ } from 'lodash';

@Entity()
@Index(['first_name', 'last_name']) // Multiple column index
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  name: string;
  @AfterLoad()
  setComputed() {
    this.name = _.startCase(
      _.lowerCase(this.first_name + ' ' + this.last_name),
    );
  }

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
  roles: RoleEntity[];
}
