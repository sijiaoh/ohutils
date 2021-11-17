import 'reflect-metadata';

import {IsNotEmpty, Min, validateOrReject} from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type {VoteEntity} from '.';

@Entity()
export class VoteOptionEntity extends BaseEntity {
  static build = (props: {
    order: number;
    name: string;
    numberOfVotes: number;
  }) => VoteOptionEntity.create(props);

  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  @Min(0)
  readonly order!: number;
  @Column()
  @IsNotEmpty()
  name!: string;
  @Column({default: 0})
  @Min(0)
  readonly numberOfVotes!: number;

  @ManyToOne('VoteEntity', {onDelete: 'CASCADE'})
  vote?: VoteEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
