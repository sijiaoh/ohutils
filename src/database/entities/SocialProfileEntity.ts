import 'reflect-metadata';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UserEntity} from '.';

@Entity('social_profiles')
@Index(['userId', 'provider'], {unique: true})
@Index(['provider', 'providerId'], {unique: true})
export class SocialProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  readonly provider!: string;
  @Column()
  readonly providerId!: string;
  @Column({type: 'varchar', nullable: true})
  readonly email!: string | null;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Column()
  readonly userId!: string;
  @ManyToOne('UserEntity', async (user: UserEntity) => user.socialProfiles, {
    onDelete: 'CASCADE',
  })
  readonly user!: Promise<UserEntity>;
}
