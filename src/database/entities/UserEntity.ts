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
import type {PostEntity, SocialProfileEntity} from '.';

@Entity()
export class UserEntity extends BaseEntity {
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
  @OneToMany('PostEntity', 'user')
  readonly posts?: PostEntity[];
}
