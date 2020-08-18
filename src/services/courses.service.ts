import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class CoursesService extends DBService {
  constructor(@InjectModel('Course') model: Model<any>,
  ) {
    super(model);
  }

};