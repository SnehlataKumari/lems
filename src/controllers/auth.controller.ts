import { Controller, Post, Get, Body, Param, Request, UseInterceptors, UploadedFile, UploadedFiles, Put, Req, Render, Res, BadRequestException, UnauthorizedException } from '@nestjs/common';
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
import { Response } from 'express';
import { UsersService } from 'src/services/users.service';

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
    private tokenService: TokensService,
    private service: AuthService,
    private userService: UsersService,
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
  
  @Post('social-signup-student')
  async socialSignUpStudent(@Body() requestBody) {
    return await this.service.socialSignupStudent(requestBody);    
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
  // @Render('thank-you')
  async verify(@Param('token') token, @Res() res: Response) {
    return await this.service.verifyToken(token, res);
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profileFile', maxCount: 1 },
  ]))
  @Put('edit-profile-teacher')
  async editProfile(@Req() req, @Body() requestBody) {
    const { user: loggedInUser } = req;
    return await this.service.editProfile(loggedInUser, requestBody)
  }


  async getUserModel(requestBody) {
    const joiSchema = Joi.object().keys({
      email: Joi.string().email()
    });

    const { emailOrMobile } = requestBody;
    let where;

    const joiValidation = joiSchema.validate({ email: emailOrMobile });

    if (!joiValidation.error) {
      where = {
        email: emailOrMobile
      }
    }


    if (emailOrMobile.length === 10 && parseInt(emailOrMobile, 10) !== NaN) {
      where = {
        phone: emailOrMobile
      }
    }

    if (!where) {
      throw new BadRequestException('Please provide valid email or mobile');
    }


    const userModel = await this.userService.findOne(where);
    if (!userModel) {
      // userModel = await this.userService.create({
      //   ...where,
      // });

      throw new UnauthorizedException('User not registered!');
    }

    return userModel;
  }

  @Post('send-otp')
  async sendOtp(@Body() requestBody) {
    const userModel = await this.getUserModel(requestBody);
    await this.service.sendOtp(userModel);
    return success('Otp sent!', this.userService.getPublicDetails(userModel));
  }

  @Post('otp-login')
  async otpLogin(@Body() requestBody) {
    const tokenType = TOKEN_TYPES['LOGIN'].key;
    
    const userModel = await this.getUserModel(requestBody);
    if(userModel.otp !== requestBody.otp) {
      throw new UnauthorizedException('Otp not matched!');
    }
    
    await this.userService.update(userModel, {
      otp: ''
    });

    const token = this.service.getUserToken(userModel.toJSON());
    await this.tokenService.delete({
      type: tokenType,
      userId: userModel._id,
    });
    await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const user = this.userService.getPublicDetails(userModel);
    return success('logged in successfully!', { user, token });
  }

  @Post('social-login-student')
  socialLoginStudent(@Body() requestBody) {
    return this.service.socialLoginStudent(requestBody);
  }
  
}
