import { Injectable } from '@nestjs/common';
import { PhotoEntity, UserEntity } from '../db';
import { CommentsRepository } from './comments.repository';
import { PhotoCommentAddDto, PhotosUploadDto } from './photos.dto';
import { PhotosRepository } from './photos.repository';

@Injectable()
export class PhotosService {
  constructor(
    private photosRepository: PhotosRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async create(photoData: PhotosUploadDto, user: UserEntity): Promise<any> {
    const photo = await this.photosRepository.create({
      ...photoData,
      user,
    });
    await this.photosRepository.save(photo);
    return photo;
  }

  async addComment(
    photoData: PhotoCommentAddDto,
    photo: PhotoEntity,
    user: UserEntity,
  ): Promise<any> {
    const comment = await this.commentsRepository.create({
      ...photoData,
      user,
      photo,
    });
    await this.commentsRepository.save(comment);
    return comment;
  }
}
