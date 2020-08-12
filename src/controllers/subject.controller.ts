import { Controller, UseGuards, Get, Param, Req } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { SubjectsService } from 'src/services/subject.service';
import { JwtAuthGuard } from 'src/passport/auth.guard';
import { success } from 'src/utils';
import { AssetsService } from 'src/services/assets.service';
import { ChaptersService } from 'src/services/chapters.service';

@Controller('subjects')
export class SubjectsController extends ResourceController {
  constructor(
    service: SubjectsService,
    private assetService: AssetsService,
    private chaptersService: ChaptersService,
  ) {
    super(service);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/assets')
  async getAllAssets(@Param('id') id, @Req() req) {
    const assetsList = await this.assetService.find({
      subject: id,
    });
    const assetsListWithisSubscribed = await this.assetService.withIsSubscribedKey(
      assetsList,
      req.user,
    );

    return success('Success!', assetsListWithisSubscribed);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/chapters')
  async getAllChapters(@Param('id') id) {
    return success(
      'Success!',
      this.chaptersService.find({
        subject: id,
      }),
    );
  }
}
