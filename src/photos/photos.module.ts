import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CommentsService } from './comments.service';
import { PhotosController } from './photos.controller';
import { DbModule } from '../db';
import { UserModule } from '../user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosRepository } from './photos.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DbModule, UserModule, TypeOrmModule.forFeature([PhotosRepository])],
  providers: [PhotosService, CommentsService],
  controllers: [PhotosController],
})
export class PhotosModule {}
