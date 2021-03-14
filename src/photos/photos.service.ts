import { Injectable } from '@nestjs/common';
import { UserEntity } from '../db';
import { PhotosUploadDto } from './photos.dto';
import { PhotosRepository } from './photos.repository';

@Injectable()
export class PhotosService {
  constructor(private photosRepository: PhotosRepository) {}

  async create(photoData: PhotosUploadDto, user: UserEntity): Promise<any> {
    const photo = await this.photosRepository.create({
      ...photoData,
      user,
    });
    await this.photosRepository.save(photo);
    return photo;
  }
}
