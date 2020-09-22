"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobile = exports.isEmail = exports.generateOTP = exports.success = void 0;
const Joi = require("@hapi/joi");
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
//# sourceMappingURL=index.js.map