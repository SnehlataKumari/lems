import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as Joi from '@hapi/joi';

const userSchem = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().min(10).max(10).required()
});

@Injectable()
export class TestService extends DBService {
  constructor(@InjectModel('Test') model: Model<any>,
  ) {
    super(model);
  }

  validateUserJson(userObject) {
    return userSchem.validateAsync(userObject, { allowUnknown: true });
  }
}