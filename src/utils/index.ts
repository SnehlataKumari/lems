import Joi = require("@hapi/joi");

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
