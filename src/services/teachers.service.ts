import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class TeachersService extends DBService {
  constructor(@InjectModel('Teacher') model: Model<any>) {
    super(model);
  }
}
