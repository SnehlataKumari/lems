import { Controller} from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { SubjectsService } from 'src/services/subject.service';

@Controller('subjects')
export class SubjectsController extends ResourceController {
  constructor(
    service: SubjectsService
  ) {
    super(service)
  }
}