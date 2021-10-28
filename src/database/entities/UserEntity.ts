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
import {PostEntity, SocialProfileEntity} from '.';

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

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  @OneToMany(() => SocialProfileEntity, socialProfile => socialProfile.user)
  readonly socialProfiles!: Promise<SocialProfileEntity[]>;
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  @OneToMany(() => PostEntity, post => post.user)
  readonly posts!: Promise<PostEntity[]>;
}
