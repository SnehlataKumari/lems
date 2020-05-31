import { Controller, Get, Param, Query, UseGuards, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';
import { ChaptersService } from 'src/services/chapters.service';
import { JwtAuthGuard } from 'src/passport/auth.guard';
import { AssetsService } from 'src/services/assets.service';

@Controller('classes')
export class ClassesController extends ResourceController {
  constructor(
    service: ClassesService,
    private chapterService: ChaptersService,
    private assetService: AssetsService
  ) {
    super(service)
  }

  @Get('/:id/chapters')
  async getAllChapters(@Param('id') classId, @Query() queries) {
    let where: any = { class: classId };

    if(queries && queries.search) {
      where = { ...where, $text: { $search: queries.search } };
    }

    console.log(where); 
    
    // {$text: {$search: "text you are searching for"}}
    
    return this.chapterService.find(where).populate('class')
    .populate('assets');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/assets')
  async getAllAssets(@Param('id') id) {
    return this.assetService.find({
      class: id
    });
  }
}