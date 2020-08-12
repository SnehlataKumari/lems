import { Controller, Get, Param, UseGuards, Query, Req } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ChaptersService } from 'src/services/chapters.service';
import { AssetsService } from 'src/services/assets.service';
import { JwtTokenAuthGuard } from 'src/passport/jwttokenauth.guard';
import { success } from 'src/utils';

@Controller('chapters')
export class ChaptersController extends ResourceController {
  constructor(service: ChaptersService, private assetService: AssetsService) {
    super(service);
  }

  @UseGuards(JwtTokenAuthGuard)
  @Get('/:id/assets')
  async getAllAssets(@Param('id') id, @Req() req) {
    const assetsList = await this.assetService.find({
      chapter: id,
    });

    const assetsListWithisSubscribed = await this.assetService.withIsSubscribedKey(
      assetsList,
      req.user,
    );
    return success('Success!', assetsListWithisSubscribed);
  }

  @UseGuards(JwtTokenAuthGuard)
  @Get()
  findAllChapters(@Query() query) {
    return success('List found successfully', this.service.findAll(query));
  }
}
