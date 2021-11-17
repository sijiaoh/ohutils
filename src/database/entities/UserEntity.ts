import 'reflect-metadata';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type {SocialProfileEntity} from '.';

@Entity()
export class UserEntity extends BaseEntity {
  static build = () => UserEntity.create();

  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column({generated: 'uuid', unique: true})
  readonly token!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @OneToMany('SocialProfileEntity', 'user')
  readonly socialProfiles?: SocialProfileEntity[];
}
