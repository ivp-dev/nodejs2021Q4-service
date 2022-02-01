import {
  BaseEntity as Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer'

class BaseEntity extends Entity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Exclude()
  @CreateDateColumn()
  createAt?: Date;

  @Exclude()
  @UpdateDateColumn()
  updateAt?: Date;
}

export default BaseEntity;
