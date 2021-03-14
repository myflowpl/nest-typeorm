import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'photo' })
export class PhotoEntity extends BaseEntity {
  @Column({ unique: true, nullable: true })
  public src: string;

  @Column({ type: 'varchar', length: 300 })
  public url: string;

  @Column({ type: 'boolean' })
  public isPrivate: boolean;

  @ManyToOne((type) => UserEntity, { eager: true, nullable: false })
  user: UserEntity;

  @OneToMany((type) => CommentEntity, (comment) => comment.photo)
  comments: CommentEntity[];
}
