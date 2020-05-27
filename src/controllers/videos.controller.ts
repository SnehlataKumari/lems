import { Controller, Body, UseInterceptors, UploadedFile, Post, Put, Param, } from '@nestjs/common';
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
    const {response} = await this.service.saveFile(file);
    return success('Resource created successfully!', this.service.create({ ...createObject, s3: response}));
  }
  
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateVideo(@Param('id') id, @Body() createObject, @UploadedFile() file) {
    const updateObject = {...createObject};
    if(file) {
      const { response } = await this.service.saveFile(file);
      updateObject.s3 = response;
    }
    return success('Resource updated successfully!', this.service.findByIdAndUpdate(id, updateObject));
  }
}