import {
  Injectable,
  PipeTransform,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PhotosRepository } from './photos.repository';

@Injectable()
export class PhotoPipe implements PipeTransform {
  constructor(private photoRepository: PhotosRepository) {}

  async transform(value: string) {
    const id = parseInt(value, 10);
    if (!id) {
      throw new BadRequestException('Id param validation failed');
    }
    const photo = await this.photoRepository.findOne(id);
    if (!photo) {
      throw new NotFoundException(`Photo for id ${id} not found`);
    }
    return photo;
  }
}
