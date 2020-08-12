import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class ClassesService extends DBService {
  constructor(@InjectModel('Class') model: Model<any>) {
    super(model);
  }
}
