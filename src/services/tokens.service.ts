import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';

@Injectable()
export class TokensService extends DBService {
  constructor(@InjectModel('Token') model: Model<any>) {
    super(model);
  }

  findByTokenAndTypeAndDelete(token, type) {
    return this.findOneAndDelete({ token, type });
  }

  findByTokenAndType(token, type) {
    return this.findOne({
      token,
      type,
    });
  }

  deleteUsersToken(userModel, tokenType) {
    return this.findOneAndDelete({
      userId: userModel._id,
      type: tokenType,
    });
  }
}
