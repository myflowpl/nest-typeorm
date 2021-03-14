import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PhotoEntity } from './photo.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  public comment: string;

  @ManyToOne((type) => UserEntity, { eager: true, nullable: false })
  user: UserEntity;

  @ManyToOne((type) => PhotoEntity, { eager: true, nullable: false })
  photo: PhotoEntity;
}
