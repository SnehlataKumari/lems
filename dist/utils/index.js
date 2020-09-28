"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSpecialChar = exports.sanitizeJson = exports.getJsonFromDocument = exports.isMobile = exports.isEmail = exports.generateOTP = exports.success = void 0;
const Joi = require("@hapi/joi");
const csv = require("csv-parser");
const fs = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
exports.success = async (message = 'Success', data) => {
    return {
        message,
        data: await data,
    };
};
exports.generateOTP = () => Math.floor(1000 + Math.random() * 9000);
exports.isEmail = (emailOrMobile) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().email()
    });
    const joiValidation = joiSchema.validate({ email: emailOrMobile });
    return !joiValidation.error;
};
exports.isMobile = (emailOrMobile) => {
    return emailOrMobile.length === 10 && !isNaN(parseInt(emailOrMobile, 10));
};
exports.getJsonFromDocument = async (documentModel) => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path_1.join(documentModel.destination, documentModel.filename))
            .pipe(csv())
            .on('data', (data) => results.push(exports.sanitizeJson(data)))
            .on('end', () => {
            resolve(results);
        });
    });
};
exports.sanitizeJson = (json) => {
    if (lodash_1.isObject(json)) {
        return Reflect.ownKeys(json).reduce((obj, key) => {
            obj[lodash_1.camelCase(exports.removeSpecialChar(key))] = exports.removeSpecialChar(json[key]);
            return obj;
        }, {});
    }
};
exports.removeSpecialChar = (stringVal) => {
    return stringVal.trim();
};
//# sourceMappingURL=index.js.map