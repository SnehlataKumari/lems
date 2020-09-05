import { Controller, Post, Get, Body, Param, Request, UseInterceptors, UploadedFile, UploadedFiles, Put, Req } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
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
  .pattern(passwordExpression);

const userSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .trim()
    .min(3)
    .max(30),
    // .required(),
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
  gender: Joi.string(),
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
    return await this.service.signUp(requestBody);
  }
  
  // @JoiValidation(userSchema)
  @Post('sign-up-student')
  async signUpStudent(@Body() requestBody) {
    return await this.service.signUp(requestBody);
  }

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'resumeFile', maxCount: 1 },
    { name: 'internetConnectionFile', maxCount: 1 },
  ]))
  // @JoiValidation(teacherSchema)
  @Post('signup-teacher')
  async signupTeacher(@Body() requestBody, @UploadedFiles() files) {
    return await this.service.signUpTeacher(requestBody, files); 
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
  
  @Post('login-admin')
  async loginAdmin(@Body() requestBody) {
    const { email, password } = requestBody;
    return await this.service.login({ email, password }, 'ADMIN');
  }
  
  @Post('login-teacher')
  async loginUser(@Body() requestBody) {
    const { email, password } = requestBody;
    return await this.service.login({ email, password }, 'TEACHER');
  }

  @Get('verify/:token')
  async verify(@Param('token') token) {
    return await this.service.verifyToken(token);
  }

  @Post('forgot-password-teacher')
  async forgot(@Body() requestBody) {
    const { email } = requestBody;
    return await this.service.forgotPassword(email, 'TEACHER');
  }

  @Post('forgot-password-admin')
  async forgotAdmin(@Body() requestBody) {
    const { email } = requestBody;
    return await this.service.forgotPassword(email, 'ADMIN');
  }
  
  @Post('forgot-password-student')
  async forgotStudent(@Body() requestBody) {
    const { email } = requestBody;
    return await this.service.forgotPassword(email, 'STUDENT');
  }

  @Post('reset-password')
  async resetPassword(@Body() requestBody) {
    const { currentPassword, token } = requestBody;
    return await this.service.resetPassword(currentPassword, token);
  }

  // @ValidateToken()
  // @Get('check-token')
  // checkToken(@Request() req) {
  //   return req.user;
  // }

  @ValidateToken()
  @Post('logout')
  async logout(@LoggedInUser() loggedInUser) {
    const tokenType = TOKEN_TYPES['LOGIN'].key;
    await this.tokensService.deleteUsersToken(loggedInUser, tokenType);
    return success('logged out successfully!', {});
  }

  @ValidateToken()
  @Post('change-password')
  async changePassword(@Req() req, @Body() requestBody) {
    const { user: loggedInUser } = req;
    return await this.service.changePassword(loggedInUser, requestBody)
  }

  @ValidateToken()
  @Post('edit-profile')
  async editProfile(@Req() req, @Body() requestBody) {
    console.log(req,'reqreqreqr');
    
    const { user: loggedInUser } = req;
    return await this.service.editProfile(loggedInUser, requestBody)
  }

}
