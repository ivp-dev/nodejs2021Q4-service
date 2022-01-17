import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

class BaseClassEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createAt?: Date

  @UpdateDateColumn()
  updateAt?: Date
}

export default BaseClassEntity