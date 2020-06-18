import { Controller, Body, Post, Put, Param, Get, Req, UseGuards } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { AssetsService } from 'src/services/assets.service';
import { success } from 'src/utils';
import { JwtAuthGuard } from 'src/passport/auth.guard';

@Controller('assets')
export class AssetsController extends ResourceController {
  constructor(service: AssetsService) {
    super(service)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllAssets(@Req() req) {
    const assetsList = await this.service.findAll();
    const assetsListWithisSubscribed = await this.service.withIsSubscribedKey(assetsList, req.user);
    return success('List found successfully', assetsListWithisSubscribed);
  }

  @Post()
  async createAsset(@Body() createObject) {
    return success('Asset created successfully!', this.service.create({ ...createObject }));
  }
  
  @Put(':id')
  async updateAsset(@Param('id') id, @Body() updateObject) {
    const updatedObject = { ...updateObject};
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