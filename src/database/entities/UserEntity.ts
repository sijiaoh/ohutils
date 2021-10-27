import 'reflect-metadata';

import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SocialProfileEntity} from '.';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @OneToMany(
    () => SocialProfileEntity,
    async socialProfile => socialProfile.user
  )
  readonly socialProfiles!: Promise<SocialProfileEntity[]>;
}
