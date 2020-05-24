import { Controller, Body, UseInterceptors, UploadedFile, Post, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { VideosService } from 'src/services/videos.service';
import { success } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideosController extends ResourceController {
  constructor(service: VideosService) {
    super(service)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createVideo(@Body() createObject, @UploadedFile() file) {
    const { fileUrl } = await this.service.saveFile(file);
    return success('Resource created successfully!', this.service.create({...createObject, url: fileUrl}));
  }
}