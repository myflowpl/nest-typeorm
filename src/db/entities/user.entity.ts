import { Entity, Column, OneToMany } from 'typeorm';
import { PhotoEntity } from '.';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column()
  public password: string;

  @OneToMany((type) => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];
}
