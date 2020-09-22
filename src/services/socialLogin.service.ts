import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class SocialLoginService extends DBService {
  constructor(@InjectModel('SocialLogin') model: Model<any>) {
    super(model);
  }
}
