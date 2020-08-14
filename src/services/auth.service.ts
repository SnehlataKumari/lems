import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokensService,
    private configs: ConfigService,
    private jwtService: JwtService,
    private emailsService: EmailService,
  ) {}

  get hostUrl() {
    return this.configs.get('HOST_URL');
  }

  async signUp(requestBody){
    const { email, password, name } = requestBody;
    const tokenType = 'VERIFY_EMAIL';
    const hash = await this.encryptPassword(password);
    const user = await this.userService.create({
      email,
      password: hash,
      name,
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
      link,
      message: 'Verification link sent to your email!',
      userModel,
    };
  }

  async login(requestBody) {
    const { email, password } = requestBody;
    const userModel = await this.userService.findByEmail(email);
    if (!userModel) {
      throw new UnauthorizedException('User not registered!');
    }
    const comparePassword = bcrypt.compareSync(password, userModel.password);
    if (userModel.isEmailVerified === true && comparePassword) {
      return userModel;
    }
    throw new UnauthorizedException('unauthorised!');
  }

  async encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async isValidAuthToken(token) {
    return await this.tokenService.findByTokenAndType(token, 'LOGIN');
  }

  getUserById(id) {
    return this.userService.findById(id);
  }
}
