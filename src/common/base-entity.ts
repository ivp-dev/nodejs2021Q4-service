import {
  BaseEntity as Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

export class BaseEntity extends Entity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
