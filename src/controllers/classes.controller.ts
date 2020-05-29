import { Controller, Get, Param, } from '@nestjs/common';
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
  async getAllChapters(@Param('id') classId) {
    return this.chapterService.findAll({
      class: classId
    }).populate('class');
  }
}