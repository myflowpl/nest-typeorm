import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from '../db';
import { User } from '../user/decorators';
import { PhotosUploadDto, PhotosUploadResponseDto } from './photos.dto';
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
}
