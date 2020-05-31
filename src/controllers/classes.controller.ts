import { Controller, Get, Param, Query, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';
import { ChaptersService } from 'src/services/chapters.service';

@Controller('classes')
export class ClassesController extends ResourceController {
  constructor(
    service: ClassesService,
    private chapterService: ChaptersService
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
}