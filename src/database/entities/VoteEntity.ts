import 'reflect-metadata';

import {IsNotEmpty, validateOrReject} from 'class-validator';
import {
  AfterLoad,
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
import type {VoteOptionEntity, UserEntity} from '.';

@Entity()
export class VoteEntity extends BaseEntity {
  static build = (props: {
    userId: string;
    title: string;
    text: string;
    voteOptions?: VoteOptionEntity[];
  }) => VoteEntity.create(props);

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
  @ManyToOne('UserEntity', {onDelete: 'CASCADE'})
  readonly user?: UserEntity;

  @OneToMany('VoteOptionEntity', 'vote')
  voteOptions?: VoteOptionEntity[];

  @AfterLoad()
  sortVoteOptions() {
    if (this.voteOptions == null) return;
    this.voteOptions = this.voteOptions.sort((a, b) => a.order - b.order);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
