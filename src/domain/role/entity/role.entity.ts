import { BaseEntity } from '../../../base/entity/base.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { UserEntity } from '../../../../src/domain/user/entity/user.entity';

@Entity()
export class RoleEntity extends BaseEntity {
  @Column()
  role: string;

  @ManyToOne((type) => UserEntity, (user) => user.properties, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
  @RelationId((role: RoleEntity) => role.user)
  userId: string;
}
