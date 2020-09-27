import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class LeaveService extends DBService {
  constructor(@InjectModel('Leave') model: Model<any>) {
    super(model);
  }
 

}
