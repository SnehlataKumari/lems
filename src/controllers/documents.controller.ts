import { Controller, Body, Post, Put, Param, Get, Req, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { DocumentsService } from 'src/services/documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller('documents')
export class DocumentsController extends ResourceController {
  constructor(
    private config: ConfigService,
    service: DocumentsService) {
    super(service)
  }

  @Post()
  async createAsset(@Body() createObject) {
    return success('Asset created successfully!', this.service.create({ ...createObject }));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {}))
  async uploadFile(@UploadedFile() file) {
    const filename = file.filename;
    const path = `/documents/${filename}`;
    const fullPath = `${this.config.get('HOST_URL')}${path}`;
    const docModel = await this.service.create({
      hostUrl: this.config.get('HOST_URL'),
      ...file,
      fullPath,
      path
    });
    return docModel;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './static/uploads' });
  }

  @Get('samples/:imgpath')
  getSampleFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './sample-files' });
  }

  @Put(':id')
  async updateAsset(@Param('id') id, @Body() updateObject) {
    const updatedObject = { ...updateObject };
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