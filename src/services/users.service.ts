import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import * as Joi from '@hapi/joi';

const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const passwordSchema = Joi.string()
  .pattern(passwordExpression)
  .required();

@Injectable()
export class UsersService extends DBService {
  constructor(@InjectModel('User') model: Model<any>,
  ) {
    super(model);
  }

  findByEmail(email) {
    return this.findOne({ email });
  }

  async validatePassword(password) {
    try {
      await passwordSchema.validateAsync(password);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  getPublicDetails(model) {
    return {...model.toJSON(), password: null};
  }

  async changePassword(userId, hashedPassword) {
   return await this.update(userId, { password: hashedPassword });
  }

}
