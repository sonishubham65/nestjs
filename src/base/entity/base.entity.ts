import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @VersionColumn({})
  version: number;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn({ update: false })
  createdAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
