import {
  Controller,
  Post,
  Get,
  Body,
  UnauthorizedException,
  BadRequestException,
  Param,
  Request,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { AuthService } from 'src/services/auth.service';
import { success } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/services/sms.service';
import { VersionService } from 'src/services/version.service';
import { TokensService } from 'src/services/tokens.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';
import Joi = require('@hapi/joi');
import { JoiValidation } from 'src/decorators/joivalidation.decorator';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { LoggedInUser } from 'src/decorators/loggedinuser.decorator';

const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const passwordSchema = Joi.string()
  .pattern(passwordExpression)
  .required();

const userSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  password: passwordSchema,
  email: Joi.string()
    .trim()
    .lowercase()
    .email(),
});
@Controller('auth')
export class AuthController {
  constructor(
    private config: ConfigService,
    private service: AuthService,
    private usersService: UsersService,
    private tokensService: TokensService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private smsService: SmsService,
    private versionService: VersionService,
  ) {}

  get hostUrl() {
    return this.config.get('HOST_URL');
  }

  // TODO: Move business logic to AuthService
  @JoiValidation(userSchema)
  @Post('sign-up')
  async signUp(@Body() requestBody) {
    // const { email, password, name } = req;
    const users = this.service.signUp(requestBody);
    return users;
    // const tokenType = 'VERIFY_EMAIL';
    // const hash = await this.service.encryptPassword(password);
    // const user = await this.usersService.create({
    //   email,
    //   password: hash,
    //   name,
    // });
    // const userModel = this.usersService.getPublicDetails(user);
    // const token = this.jwtService.sign(userModel);
    // await this.tokensService.create({
    //   token,
    //   type: tokenType,
    //   userId: userModel._id,
    // });
    // const link = `${this.hostUrl}/auth/verify/${token}`;

    // await this.emailService.sendVerificationLink(userModel, link);

    // return {
    //   link,
    //   message: 'Verification link sent to your email!',
    //   userModel,
    // };
  }

  // TODO: Move business logic to AuthService
  @Post('resend-verification-email')
  async resendVerificationLink(@Body() requestBody) {
    const tokenType = 'VERIFY_EMAIL';
    const { email } = requestBody;
    const userModel = await this.usersService.findByEmail(email);

    if (!userModel) {
      throw new UnauthorizedException('Email not found!');
    }

    if (userModel.isEmailVerified) {
      throw new BadRequestException('Email is already verified!');
    }

    await this.tokensService.deleteUsersToken(userModel, tokenType);
    const userObj = this.usersService.getPublicDetails(userModel);
    const token = this.jwtService.sign(userObj);
    await this.tokensService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const link = `${this.hostUrl}/auth/verify/${token}`;
    await this.emailService.sendVerificationLink(userObj, link);

    return { message: 'Verification link sent successfully!', link };
  }

  @Get('verify/:token')
  async verify(@Param('token') token) {
    const tokenType = 'VERIFY_EMAIL';
    const user = this.jwtService.verify(token);
    const isTokenExist = await this.tokensService.findByTokenAndType(
      token,
      tokenType,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException('Invalid token!');
    }
    await this.tokensService.findByTokenAndTypeAndDelete(token, tokenType);
    const id = user._id;
    if (user) {
      await this.usersService.findByIdAndUpdate(id, { isEmailVerified: true });
      return `Email <b>${user.email}</b> Verified Successfully`;
    }
  }

  // TODO: Move business logic to AuthService
  @Post('login')
  async login(@Body() requestBody) {
    const tokenType = 'LOGIN';
    const userModel = await this.service.login(requestBody);
    const token = this.jwtService.sign(userModel.toJSON());
    await this.tokensService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const user = this.usersService.getPublicDetails(userModel);
    return success('logged in successfully!', { user, token });
  }

  // TODO: Move business logic to AuthService
  @Post('forgot-password')
  async forgot(@Body() body) {
    const tokenType = 'FORGOT_PASSWORD';
    const userModel = await this.usersService.findByEmail(
      body.email.toLowerCase(),
    );
    if (!userModel) {
      throw new UnauthorizedException('Email not found!');
    }
    const user = this.usersService.getPublicDetails(userModel);
    const token = this.jwtService.sign(user);
    await this.tokensService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    return token;
  }

  @Post('reset-password')
  async resetPassword(@Body() requestBody) {
    const { password, token } = requestBody;
    const tokenType = 'FORGOT_PASSWORD';

    const verifyToken = this.jwtService.verify(token);
    const isTokenExist = await this.tokensService.findByTokenAndType(
      token,
      tokenType,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException('Invalid token!');
    }
    await this.tokensService.findByTokenAndTypeAndDelete(token, tokenType);
    await this.usersService.validatePassword(password);
    const hash = await this.service.encryptPassword(password);
    await this.usersService.findByIdAndUpdate(verifyToken._id, {
      password: hash,
    });
    return success('Password reset successful!', {});
  }

  @ValidateToken()
  @Get('check-token')
  checkToken(@Request() req) {
    return req.user;
  }

  @ValidateToken()
  @Post('logout')
  async logout(@LoggedInUser() loggedInUser) {
    const tokenType = 'LOGIN';
    await this.tokensService.deleteUsersToken(loggedInUser, tokenType);
    return success('logged out successfully!', {});
  }
}
