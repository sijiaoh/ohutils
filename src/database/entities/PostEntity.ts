import 'reflect-metadata';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UserEntity} from '.';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  readonly type!: string;
  @Column()
  readonly title!: string;
  @Column('text')
  readonly text!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Column()
  readonly userId!: string;
  @ManyToOne(() => UserEntity, {onDelete: 'CASCADE'})
  readonly user!: Promise<UserEntity>;
}
