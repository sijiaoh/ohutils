import 'reflect-metadata';

import {IsNotEmpty, validateOrReject} from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type {TagEntity, UserEntity} from '.';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  @IsNotEmpty()
  title!: string;
  @Column('text')
  text!: string;
  @Column()
  copyProtect!: boolean;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Column()
  readonly userId!: string;
  @ManyToOne('UserEntity', {onDelete: 'CASCADE'})
  readonly user?: UserEntity;

  @ManyToMany('TagEntity')
  @JoinTable()
  tags?: TagEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
