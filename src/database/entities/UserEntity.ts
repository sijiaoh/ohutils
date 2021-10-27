import 'reflect-metadata';

import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {SocialProfileEntity} from '.';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  @OneToMany(() => SocialProfileEntity, socialProfile => socialProfile.user)
  readonly socialProfiles!: Promise<SocialProfileEntity[]>;
}
