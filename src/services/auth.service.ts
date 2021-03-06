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
import { DBTransactionService } from './dbtransaction.service';
import { StudentsService } from './students.service';
import { SmsService } from './sms.service';
import { SocialLoginService } from './socialLogin.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokensService,
    private configs: ConfigService,
    private jwtService: JwtService,
    private emailsService: EmailService,
    private smsService: SmsService,
    private teacherService: TeachersService,
    private transaction: DBTransactionService,
    private socialLoginService: SocialLoginService,
    private studentService: StudentsService
  ) { }

  hostUrl(role) {
    if (role === 'ADMIN') {
      return this.configs.get('HOSTFE_URL_ADMIN');
    }

    if (role === 'STUDENT') {
      return this.configs.get('HOSTFE_URL_STUDENT');
    }

    if (role === 'TEACHER') {
      return this.configs.get('HOSTFE_URL_TEACHER');
    }

    return this.configs.get('HOSTFE_URL');
  }

  getUserToken(userObj) {
    return this.jwtService.sign({ ...userObj, profileImage: '' });
  }

  async signUp(requestBody, role = 'STUDENT') {
    const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    const hash = await this.encryptPassword(String(requestBody.password));
    const userModel = await this.userService.create({
      ...requestBody,
      password: hash,
    });
    const userObj = this.userService.getPublicDetails(userModel);
    const token = this.jwtService.sign(userObj);
    await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    if (role === 'STUDENT') {
      await this.studentService.create({ userId: userModel._id, education: {grade: requestBody.grade}});
    }
    const link = `${this.apiUrl(role)}/auth/verify/${token}`;

    const loginTokenType = TOKEN_TYPES['LOGIN'].key;
    const loginToken = this.getUserToken(userModel.toJSON());
    await this.tokenService.delete({
      type: loginTokenType,
      userId: userModel._id,
    });
    await this.tokenService.create({
      token: loginToken,
      type: loginTokenType,
      userId: userModel._id,
    });

    await this.emailsService.sendVerificationLink(userModel, link);
    return success('Verification link sent to your email!', { user: userObj, token: loginToken });
  }

  async updatePassword(userId, currentPassword) {
    const hashedPassword = await this.encryptPassword(currentPassword);
    const userModel = await this.userService.changePassword(userId, hashedPassword);
    return userModel;
  }

  getRandomPassword() {
    return Math.random().toString(36).slice(-8);
  }

  async socialSignupStudent(requestBody) {
    const userModel = await this.userService.create({
      ...requestBody,
      isEmailVerified: true
    });

    // const socialLoginModel = await this.socialLoginService.create({
    //   user: userModel._id,
    //   socialLoginType: requestBody.socialLoginType,
    //   socialLoginId: requestBody.socialLoginId,
    // });
    await this.studentService.create({ userId: userModel._id,});

    const tokenType = TOKEN_TYPES['LOGIN'].key;
    const token = this.getUserToken(userModel.toJSON());
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

  async socialLoginStudent(requestBody) {
    const userModel = await this.userService.findOne({
      email: requestBody.email
    });

    if (!userModel) {
      throw new UnauthorizedException('User not registered!');
    }

    const tokenType = TOKEN_TYPES['LOGIN'].key;
    const token = this.getUserToken(userModel.toJSON());
    await this.tokenService.delete({
      type: tokenType,
      userId: userModel._id,
    });
    await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const userObj = this.userService.getPublicDetails(userModel);
    return success('logged in successfully!', { user: userObj, token });
  }

  async signUpTeacher(requestBody, files) {
    let userModel;
    let teacherModel;
    const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    try {
      const { user: userObject, teacher: teacherObject } = requestBody;
      const hash = await this.encryptPassword(userObject.email);
      userModel = await this.userService.create({
        ...userObject,
        password: hash,
        role: 'TEACHER'
      });  
      const user = this.userService.getPublicDetails(userModel);
      const token = this.jwtService.sign(user);
      await this.tokenService.create({
        token,
        type: tokenType,
        userId: userModel._id,
      });
      const link = `${this.apiUrl(userModel.role)}/auth/verify/${token}`;

      // TODO: Change teacher schema to have dateOfBirth of type Date
      const dateOfBirth = teacherObject.dateOfBirth;
      teacherModel = await this.teacherService.create({
        ...teacherObject, userId: user._id,
        dateOfBirth: dateOfBirth,
        resume: files.resumeFile,
        screenShotOfInternet: files.internetConnectionFile
      });
      await this.emailsService.sendVerificationLink(userModel, link);
      return {
        message: 'Verification link for Teacher is sent to your email!',
        user,
      };
    } catch (error) {
      if(userModel) {
        await this.userService.removeModel(userModel);
      }
      if(teacherModel) {
        await this.teacherService.removeModel(teacherModel);
      }

      throw error;
    }
  }

  apiUrl(role?) {
    return this.configs.get('HOST_URL');
  }

  async verifyToken(token, res) {
    const tokenType = TOKEN_TYPES['VERIFY_EMAIL'].key;
    const user = this.jwtService.verify(token);
    const isTokenExist = await this.tokenService.findByTokenAndType(
      token,
      tokenType,
    );
    if (!isTokenExist) {
      return res.render(
        'email-already-registered',
        { loginLink: this.hostUrl(user.role) },
      );
    }
    await this.tokenService.findByTokenAndTypeAndDelete(token, tokenType);
    const id = user._id;
    if (user) {
      await this.userService.findByIdAndUpdate(id, { isEmailVerified: true });

      return res.render(
        'thank-you',
        { ...user, loginLink: this.hostUrl(user.role) },
      );
    }
  }

  async resendVerificationLink(email, role = 'STUDENT') {
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
    const token = this.getUserToken(userObj);
    await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });
    const link = `${this.hostUrl(role)}/auth/verify/${token}`;
    await this.emailsService.sendVerificationLink(userObj, link);
    return { message: 'Verification link sent successfully!' };
  }

  // TODO: pass role
  async login({ email, password }, role = 'STUDENT') {
    const tokenType = TOKEN_TYPES['LOGIN'].key;
    const userModel = await this.userService.findOne({ email: email.toLowerCase(), role }); 
    if (!userModel) {
      throw new UnauthorizedException('User not registered!');
    }

    if (!userModel.password) {
      throw new UnauthorizedException('You have not setup password, Please reset password and then login again!');
    }

    const comparePassword = bcrypt.compareSync(password, userModel.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Incorrect credential!');
    }

    if (userModel.role === 'TEACHER' && !userModel.isEmailVerified) {
      throw new UnauthorizedException('Please verify email to login!');
    }
    
    if (userModel.role === 'TEACHER') {
      const teacherModel = await this.teacherService.findOne({userId: userModel._id});
      if (teacherModel && teacherModel.hasAcceptedRegistrationRequest === false) {
        throw new UnauthorizedException('Your registration request has been declined!');
      }
    }
    const token = this.getUserToken(userModel.toJSON());
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

  // TODO:  FIND BY ROLE ALSO
  async forgotPassword(email, role = 'STUDENT') {
    const tokenType = TOKEN_TYPES['FORGOT_PASSWORD'].key;
    const userModel = await this.userService.findOne({ email: email.toLowerCase(), role });
    if (!userModel) {
      throw new UnauthorizedException('User not found!');
    }
    const user = this.userService.getPublicDetails(userModel);
    const token = this.getUserToken(user);
    const forgotToken = await this.tokenService.create({
      token,
      type: tokenType,
      userId: userModel._id,
    });

    const link = `${this.hostUrl(role)}/reset-password/${token}`;
    // await this.emailsService.sendVerificationLink(userModel, link);
    await this.emailsService.sendResetPasswordLink(userModel, link);
    return {
      message: 'link sent to your email-address',
      forgotToken
    };
  }

  async resetPassword(currentPassword, token) {
    const tokenType = TOKEN_TYPES['FORGOT_PASSWORD'].key;
    const verifyToken = this.jwtService.verify(token);
    const isTokenExist = await this.tokenService.findByTokenAndType(
      token,
      tokenType,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException('Invalid token!');
    }
    // await this.userService.validatePassword(currentPassword);
    await this.tokenService.findByTokenAndTypeAndDelete(token, tokenType);
    const hash = await this.encryptPassword(currentPassword);
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
 
  async changePassword(loggedInUser, requestBody) {
    const { oldPassword, newPassword } = requestBody;
    const comparePassword = bcrypt.compareSync(oldPassword, loggedInUser.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Old password is incorrect!');
    }
    const hashNewPassword = await this.encryptPassword(newPassword);
    return await this.userService.update(loggedInUser, { password: hashNewPassword });
  }
 
  async editProfile(loggedInUser, requestBody) {
    const userId = loggedInUser._id;
    const teacher = await this.teacherService.findOne({ userId: userId });
    if (!teacher) {
      throw new UnauthorizedException('user not found!');
    }
    const userModel = await this.userService.update(loggedInUser, requestBody.user);
    const teacherModel = await this.teacherService.update(teacher, requestBody.teacher);
    return {
      user: userModel,
      teacher: teacherModel
    }
  }

  async sendOtp(userModel) {
    const otp = '0000';
    await this.userService.update(userModel, {
      otp
    });
    await this.emailsService.sendOtp(userModel);
    await this.smsService.sendOtp(userModel);

  }

}
