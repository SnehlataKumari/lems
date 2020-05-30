import { Controller, Body, UseInterceptors, UploadedFile, Post, Put, Param, UploadedFiles, } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResourceController } from './resource.controller';
import { AssetsService } from 'src/services/assets.service';
import { success } from 'src/utils';
import { find } from 'lodash';

@Controller('assets')
export class AssetsController extends ResourceController {
  constructor(service: AssetsService) {
    super(service)
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async createVideo(@Body() createObject, @UploadedFile() file) {
  //   const {response} = await this.service.saveFile(file);
  //   return success('Resource created successfully!', this.service.create({ ...createObject, s3: response}));
  // }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'video', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]))
  async createAsset(@Body() createObject, @UploadedFiles() files) {
    const { videoS3, pdfS3 } = await this.uploadAssetsTos3(files);
    return success('Asset created successfully!', this.service.create({ ...createObject, videoS3, pdfS3 }));
  }
  
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'video', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]))
  async updateAsset(@Param('id') id, @Body() updateObject, @UploadedFiles() files) {
    const uploadedS3Details = await this.uploadAssetsTos3(files);
    const updatedObject = { ...updateObject, ...uploadedS3Details };
    return success('Asset updated successfully!', this.service.findByIdAndUpdate(id, updatedObject));
  }

  async uploadAssetsTos3(files) {
    let videoS3, pdfS3;
    const { video, pdf } = files;

    if (video && video[0]) {
      videoS3 = (await this.service.saveFile(video[0])).response;
    }

    if (pdf && pdf[0]) {
      pdfS3 = (await this.service.saveFile(pdf[0])).response;
    }

    return {
      videoS3,
      pdfS3
    }
  }
}