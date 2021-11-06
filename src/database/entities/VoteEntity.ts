import 'reflect-metadata';

import {IsNotEmpty, validateOrReject} from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {VoteOptionEntity} from './VoteOptionEntity';
import {UserEntity} from '.';

@Entity()
export class VoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  @IsNotEmpty()
  title!: string;
  @Column('text')
  text!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Column()
  readonly userId!: string;
  @ManyToOne(() => UserEntity, {onDelete: 'CASCADE'})
  readonly user?: UserEntity;

  @OneToMany(() => VoteOptionEntity, voteOption => voteOption.vote)
  voteOptions?: VoteOptionEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
