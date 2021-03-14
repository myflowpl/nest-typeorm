import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../db';

@EntityRepository(CommentEntity)
export class CommentsRepository extends Repository<CommentEntity> {}
