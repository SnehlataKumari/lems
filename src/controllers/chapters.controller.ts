import { Controller, Get, Param, UseGuards, Query, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ChaptersService } from 'src/services/chapters.service';
import { AssetsService } from 'src/services/assets.service';
import { JwtAuthGuard } from 'src/passport/auth.guard';
import { success } from 'src/utils';

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
    return success('Success!', this.assetService.find({
      chapter: id
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllChapters(@Query() query) {
    return success('List found successfully', this.service.findAll(query));
  }
}