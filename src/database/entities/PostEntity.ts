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
import {TagEntity, UserEntity} from '.';

@Entity()
export class PostEntity extends BaseEntity {
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
  readonly user!: Promise<UserEntity>;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags!: Promise<TagEntity[]>;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
