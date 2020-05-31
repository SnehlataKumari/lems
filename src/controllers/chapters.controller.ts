import { Controller, Get, Param, UseGuards, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ChaptersService } from 'src/services/chapters.service';
import { AssetsService } from 'src/services/assets.service';
import { JwtAuthGuard } from 'src/passport/auth.guard';

@Controller('chapters')
export class ChaptersController extends ResourceController {
  constructor(
    service: ChaptersService,
    private assetService: AssetsService
  ) {
    super(service)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/assets')
  async getAllAssets(@Param('id') id) {
    return this.assetService.find({
      chapter: id
    });
  }
}