import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

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
}
