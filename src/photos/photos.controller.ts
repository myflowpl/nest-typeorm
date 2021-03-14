import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PhotoEntity, UserEntity } from '../db';
import { User } from '../user/decorators';
import { PhotoPipe } from './photo.pipe';
import {
  PhotoCommentAddDto,
  PhotoCommentAddResponseDto,
  PhotosUploadDto,
  PhotosUploadResponseDto,
} from './photos.dto';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async upload(
    @Body() photoData: PhotosUploadDto,
    @User() user: UserEntity,
  ): Promise<PhotosUploadResponseDto> {
    const photo = await this.photosService.create(photoData, user);
    return { photo };
  }

  @Post(':photoId/comments')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'photoId', type: Number })
  async photoCommentAdd(
    @Body() commentData: PhotoCommentAddDto,
    @Param('photoId', PhotoPipe) photo: PhotoEntity,
    @User() user: UserEntity,
  ): Promise<PhotoCommentAddResponseDto> {
    const comment = await this.photosService.addComment(
      commentData,
      photo,
      user,
    );
    return { comment };
  }
}
