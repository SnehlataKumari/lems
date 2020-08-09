import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class LoginService extends DBService {
  constructor(@InjectModel('Login') model: Model<any>) {
    super(model);
  }

  }
