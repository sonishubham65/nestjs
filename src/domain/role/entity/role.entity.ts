import { BaseEntity } from '../../../base/entity/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../../../src/domain/user/entity/user.entity';
import { Role } from '../enum.role';

@Entity()
export class RoleEntity extends BaseEntity {
  @Column()
  role: string;

  @Column({ nullable: true, select: false })
  userId: string;

  @ManyToOne((type) => UserEntity, (user) => user.properties, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
