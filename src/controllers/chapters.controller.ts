import { Controller, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ChaptersService } from 'src/services/chapters.service';

@Controller('chapters')
export class ChaptersController extends ResourceController {
  constructor(service: ChaptersService) {
    super(service)
  }
}