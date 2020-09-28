import Joi = require("@hapi/joi");
import * as csv from 'csv-parser';
import * as fs from 'fs';

import { isObject, camelCase } from 'lodash';
import { join } from "path";

export const success = async (message = 'Success', data: any) => {
  return {
    message,
    data: await data,
  };
};

export const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

export const isEmail = (emailOrMobile) => {
  const joiSchema = Joi.object().keys({
    email: Joi.string().email()
  });

  const joiValidation = joiSchema.validate({ email: emailOrMobile });
  return !joiValidation.error;
}

export const isMobile = (emailOrMobile) => {
  return emailOrMobile.length === 10 && !isNaN(parseInt(emailOrMobile, 10))
}

export const getJsonFromDocument = async (documentModel) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(documentModel.destination, documentModel.filename))
      .pipe(csv())
      .on('data', (data) => results.push(sanitizeJson(data)))
      .on('end', () => {
        resolve(results)
      });
  });
}

export const sanitizeJson = (json) => {
  if (isObject(json)) {
    return Reflect.ownKeys(json).reduce((obj, key) => {
      obj[camelCase(removeSpecialChar(key))] = removeSpecialChar(json[key]);
      return obj;
    }, {});
  }
}

export const removeSpecialChar = (stringVal) => {
  return stringVal.trim();
}
