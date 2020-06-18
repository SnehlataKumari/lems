import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class VersionService extends DBService {
  constructor(@InjectModel('Version') model: Model<any>) {
    super(model);
  }
}