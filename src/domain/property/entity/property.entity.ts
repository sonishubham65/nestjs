import { BaseEntity } from '../../../base/entity/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
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

  @Column({ default: 'east' })
  facing: string;

  @Column()
  address: string;

  @ManyToOne((type) => UserEntity, (user) => user.properties, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
  @RelationId((property: PropertyEntity) => property.user) // you need to specify target relation
  userId: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
    default: PropertyType['House/Villa'],
  })
  type: PropertyType;

  @Column({ nullable: true, length: 300 })
  cover: string;
}
