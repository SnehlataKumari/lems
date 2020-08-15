import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { TokensService } from 'src/services/tokens.service';
import { ConfigService } from '@nestjs/config';
import Joi = require('@hapi/joi');
import { JoiValidation } from 'src/decorators/joivalidation.decorator';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { LoggedInUser } from 'src/decorators/loggedinuser.decorator';
import { success } from 'src/utils';
import { TOKEN_TYPES } from 'src/constants';

const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const passwordSchema = Joi.string()
  .pattern(passwordExpression)
  .required();

const userSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  phone: Joi.string()
    .trim()
    .min(10)
    .max(10)
    .required(),
  password: passwordSchema,
  email: Joi.string()
    .trim()
    .lowercase()
    .email(),
});

const teacherSchema = Joi.object({
  user: userSchema,
}).unknown(true);

@Controller('auth')
export class AuthController {
  constructor(
    private config: ConfigService,
    private service: AuthService,
    private tokensService: TokensService,
  ) {}

  get hostUrl() {
    return this.config.get('HOST_URL');
  }

  @JoiValidation(userSchema)
  @Post('sign-up')
  async signUp(@Body() requestBody) {
    const { email, password, firstName, lastName, phone } = requestBody;
    return await this.service.signUp({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
  }

  @JoiValidation(teacherSchema)
  @Post('signup-teacher')
  async signupTeacher(@Body() requestBody) {
    return await this.service.signUpTeacher(requestBody);
  }

  @Post('resend-verification-email')
  async resendVerificationLink(@Body() requestBody) {
    const { email } = requestBody;
    return await this.service.resendVerificationLink(email);
  }

  @Post('login')
  async login(@Body() requestBody) {
    const { email, password } = requestBody;
    return await this.service.login({ email, password });
  }

  @Get('verify/:token')
  async verify(@Param('token') token) {
    return await this.service.verifyToken(token);
  }

  @Post('forgot-password')
  async forgot(@Body() requestBody) {
    const { email } = requestBody;
    return await this.service.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() requestBody) {
    const { password, token } = requestBody;
    return await this.service.resetPassword(password, token);
  }

  @ValidateToken()
  @Get('check-token')
  checkToken(@Request() req) {
    return req.user;
  }

  @ValidateToken()
  @Post('logout')
  async logout(@LoggedInUser() loggedInUser) {
    const tokenType = TOKEN_TYPES['LOGIN'].key;
    await this.tokensService.deleteUsersToken(loggedInUser, tokenType);
    return success('logged out successfully!', {});
  }
}
