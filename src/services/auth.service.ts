import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';
import { success } from 'src/utils';
import { TOKEN_TYPES } from 'src/constants';
import { TeachersService } from './teachers.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokensService,
    private configs: ConfigService,
    private jwtService: JwtService,
    private emailsService: EmailService,
    private teacherService: TeachersService,
  ) {}

  get hostUrl() {
    return this.configs.get('HOST_URL');
  }

  async signUp(requestBody) {
    const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    const hash = await this.encryptPassword(requestBody.password);
    const user = await this.userService.create({
      ...requestBody,
      password: hash
    });
    const userModel = this.userService.getPublicDetails(user);
    const token = this.jwtService.sign(userModel);
    await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const link = `${this.hostUrl}/auth/verify/${token}`;
    await this.emailsService.sendVerificationLink(userModel, link);
    return {
      message: 'Verification link sent to your email!',
      userModel,
    };
  }

  async signUpTeacher(requestBody) {
    // try {
    //   const session = await this.userService.getModel().db.startSession();
    //   session.startTransaction();

    //   try { } catch (error) {
    //     await session.abortTransaction();
    //     this.logger.error(`Administrator '${newAdmin.email}' couldn\'t create or update`);
    //     this.logger.error(error);
    //   } finally {
    //     session.endSession();
    //   }
    // } catch (error) {
    //   console.log(error);
      
    //   // this.logger.error(error);
    //   // this.logger.error('Transaction couldn\'t create');
    // }
    
    const { user: userObject, teacher: teacherObject } = requestBody;
    // const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    // const hash = await this.encryptPassword(userObject.password);
    // console.log(hash);
    const user = await this.userService.create({
      ...userObject,
    });
    
    const userModel = this.userService.getPublicDetails(user);

    // const token = this.jwtService.sign(userModel);
    // await this.tokenService.create({
    //   token,
    //   type: tokenType,
    //   userId: userModel._id,
    // });
    
    await this.teacherService.create({...teacherObject, userId: user._id});
    // const link = `${this.hostUrl}/auth/verify/${token}`;
    await this.emailsService.sendVerificationLink(userModel,'You have successfully signed-in with LEMS');
    return {
      message: 'Verification link for Teacher is sent to your email!',
      userModel,
    };
  }

  async verifyToken(token) {
    const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    const user = this.jwtService.verify(token);
    const isTokenExist = await this.tokenService.findByTokenAndType(
      token,
      tokenType,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException('Invalid token!');
    }
    await this.tokenService.findByTokenAndTypeAndDelete(token, tokenType);
    const id = user._id;
    if (user) {
      await this.userService.findByIdAndUpdate(id, { isEmailVerified: true });
      return `Email <b>${user.email}</b> Verified Successfully`;
    }
  }

  async resendVerificationLink(email) {
    const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    const userModel = await this.userService.findByEmail(email);
    if (!userModel) {
      throw new UnauthorizedException('Email not found!');
    }
    if (userModel.isEmailVerified) {
      throw new BadRequestException('Email is already verified!');
    }
    await this.tokenService.deleteUsersToken(userModel, tokenType);
    const userObj = this.userService.getPublicDetails(userModel);
    const token = this.jwtService.sign(userObj);
    await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const link = `${this.hostUrl}/auth/verify/${token}`;
    await this.emailsService.sendVerificationLink(userObj, link);
    return { message: 'Verification link sent successfully!' };
  }

  async login({ email, password }) {
    const tokenType = TOKEN_TYPES['LOGIN'].key;
    const userModel = await this.userService.findByEmail(email);
    if (!userModel) {
      throw new UnauthorizedException('User not registered!');
    }
    const comparePassword = bcrypt.compareSync(password, userModel.password);
    if (!comparePassword) {
      throw new UnauthorizedException('wrong password!');
    }
    if (userModel.isEmailVerified === true) {
      const token = this.jwtService.sign(userModel.toJSON());
      await this.tokenService.create({
        token,
        type: tokenType,
        userId: userModel._id,
      });
      const user = this.userService.getPublicDetails(userModel);
      return success('logged in successfully!', { user, token });
    }
    throw new UnauthorizedException('Email not verified!');
  }

  async forgotPassword(email) {
    const tokenType = TOKEN_TYPES['FORGOT_PASSWORD'].key;
    const userModel = await this.userService.findByEmail(email.toLowerCase());
    if (!userModel) {
      throw new UnauthorizedException('Email not found!');
    }
    const user = this.userService.getPublicDetails(userModel);
    const token = this.jwtService.sign(user);
    const forgotToken = await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    return forgotToken;
  }

  async resetPassword(password, token) {
    const tokenType = TOKEN_TYPES['FORGOT_PASSWORD'].key;
    const verifyToken = this.jwtService.verify(token);
    const isTokenExist = await this.tokenService.findByTokenAndType(
      token,
      tokenType,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException('Invalid token!');
    }
    await this.tokenService.findByTokenAndTypeAndDelete(token, tokenType);
    await this.userService.validatePassword(password);
    const hash = await this.encryptPassword(password);
    await this.userService.findByIdAndUpdate(verifyToken._id, {
      password: hash,
    });
    return success('Password reset successful!', {});
  }

  async encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async isValidAuthToken(token) {
    return await this.tokenService.findByTokenAndType(
      token,
      TOKEN_TYPES['LOGIN'].key,
    );
  }

  getUserById(id) {
    return this.userService.findById(id);
  }
}
