import 'reflect-metadata';

import type {Profile} from 'passport';
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
import type {UserEntity} from '.';

@Entity()
@Index(['userId', 'provider'], {unique: true})
@Index(['provider', 'providerId'], {unique: true})
export class SocialProfileEntity extends BaseEntity {
  static build = ({userId, profile}: {userId: string; profile: Profile}) =>
    SocialProfileEntity.create({
      userId,
      provider: profile.provider,
      providerId: profile.id,
      email: profile.emails?.[0]?.value || null,
    });

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
  @ManyToOne('UserEntity', {onDelete: 'CASCADE'})
  readonly user?: UserEntity;
}
