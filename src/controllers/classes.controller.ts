import { Controller, Get, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';
import { ChaptersService } from 'src/services/chapters.service';
import { JwtAuthGuard } from 'src/passport/jwtauth.guard';
import { AssetsService } from 'src/services/assets.service';
import { success } from 'src/utils';
import { SubjectsService } from 'src/services/subject.service';

@Controller('classes')
export class ClassesController extends ResourceController {
  constructor(
    service: ClassesService,
    private chapterService: ChaptersService,
    private assetService: AssetsService,
    private subjectService: SubjectsService,
  ) {
    super(service);
  }

  @Get('/:id/chapters')
  async getAllChapters(@Param('id') classId, @Query() queries) {
    let where: any = { class: classId };

    if (queries && queries.search) {
      where = { ...where, $text: { $search: queries.search } };
    }
    return this.chapterService
      .find(where)
      .populate('class')
      .populate('assets');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/assets')
  async getAllAssets(@Param('id') id, @Req() req) {
    const assetsList = await this.assetService.find({
      class: id,
    });

    const assetsListWithisSubscribed = await this.assetService.withIsSubscribedKey(
      assetsList,
      req.user,
    );

    return success('Success!', assetsListWithisSubscribed);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/subjects')
  async getAllSubjects(@Param('id') id) {
    return success(
      'Success!',
      this.subjectService.find({
        class: id,
      }),
    );
  }
}
