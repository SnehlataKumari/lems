import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class ChaptersService extends DBService {
  constructor(@InjectModel('Chapter') model: Model<any>) {
    super(model);
  }
}