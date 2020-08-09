import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { pick } from 'lodash';

@Injectable()
export class UsersService extends DBService {
  constructor(@InjectModel('User') model: Model<any>) {
    super(model);
  }

  findByEmail(email) {
    const user = this.findOne({email});
    return user;
  }

   publicKeys = ['_id', 'name', 'email', 'isEmailVerified'];

   getPublicDetails(user) {
     return pick(user, this.publicKeys);
   }
}