import { BaseEntity } from '../../../base/entity/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UserEntity } from '../../../../src/domain/user/entity/user.entity';
import { PropertyType } from './property.type.enum';

@Entity()
export class PropertyEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  short_description: string;

  @Column()
  long_description: string;

  @Column()
  sqft: number;

  @Column()
  address: string;

  @ManyToOne((type) => UserEntity, (user) => user.properties)
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: PropertyType,
    default: PropertyType['House/Villa'],
  })
  type: PropertyType;
}
