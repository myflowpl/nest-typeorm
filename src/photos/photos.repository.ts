import { EntityRepository, Repository } from 'typeorm';
import { PhotoEntity } from '../db';

@EntityRepository(PhotoEntity)
export class PhotosRepository extends Repository<PhotoEntity> {}
