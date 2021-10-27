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

  /**
   * @deprecated
   * Don't use `await user.socialProfiles`.
   * Lazy one to many will throw [TypeError: Cannot read property 'joinColumns' of undefined].
   * Use `await user.getSocialProfiles()` instead.
   */
  @OneToMany(
    () => SocialProfileEntity,
    async socialProfile => socialProfile.user
  )
  readonly socialProfiles!: Promise<SocialProfileEntity[]>;

  getSocialProfiles = async () => {
    return SocialProfileEntity.find({where: {userId: this.id}});
  };
}
