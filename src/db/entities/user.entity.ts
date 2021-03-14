import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column()
  public password: string;
}
