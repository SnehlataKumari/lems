import { Controller, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';

@Controller('classes')
export class ClassesController extends ResourceController {
  constructor(service: ClassesService) {
    super(service)
  }
}