import 'reflect-metadata';

import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
  @Column()
  name!: string;
}
