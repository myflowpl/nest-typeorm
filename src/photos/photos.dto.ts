import { ApiProperty } from '@nestjs/swagger';
import { PhotoEntity } from '../db/entities/photo.entity';

export class PhotosUploadDto {
  @ApiProperty({ example: 'https://randomuser.me/api/portraits/women/66.jpg' })
  url: string;

  @ApiProperty({ example: false })
  isPrivate: boolean;

  comment?: string;
}
export class PhotosUploadResponseDto {
  photo: PhotoEntity;
}
