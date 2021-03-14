import { EntityRepository, Repository } from 'typeorm';
import { PhotoEntity, UserEntity } from '../db';

@EntityRepository(PhotoEntity)
export class PhotosRepository extends Repository<PhotoEntity> {
  async findPublicPhotos(): Promise<PhotoEntity[]> {
    const photos = await this.createQueryBuilder('photo')
      .where('photo.isPrivate = false')
      .getMany();
    return photos;
  }

  async findUserPhotos(user: UserEntity): Promise<PhotoEntity[]> {
    const query = await this.createQueryBuilder(
      'photo',
    ).leftJoinAndSelect('photo.user', 'user', 'user.id = :id', { id: user.id });
    // .where('photo.user.id = :id', { id: user.id });

    return query.getMany();
  }
}
