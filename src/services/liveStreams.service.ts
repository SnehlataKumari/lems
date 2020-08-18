import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class LiveStreamsService extends DBService {
  constructor(@InjectModel('LiveStream') model: Model<any>,
  ) {
    super(model);
  }

};