import 'reflect-metadata';

import {IsNotEmpty, Matches, validateOrReject} from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {PostEntity} from '.';

@Entity()
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column({unique: true})
  @IsNotEmpty()
  @Matches(/^((?!\s).)*$/)
  readonly name!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @ManyToMany(() => PostEntity)
  readonly posts?: PostEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
