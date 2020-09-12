import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
@Injectable()
export class TestService extends DBService {
  constructor(@InjectModel('Test') model: Model<any>,
  ) {
    super(model);
  }
}