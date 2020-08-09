import { Injectable, UnauthorizedException } from "@nestjs/common";
import { generateOTP } from "src/utils";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService) { }

  async login(requestBody) {
    const { email, password } = requestBody;
    const userModel = await this.userService.findByEmail(email);
    if (!userModel) {
      throw new UnauthorizedException('User not registered!');
    }

    const comparePassword = bcrypt.compareSync(password, userModel.password);
    if (userModel.isEmailVerified === true && comparePassword) {
      return requestBody;
    }
    
    throw new UnauthorizedException('unauthorised!');

  }
}
  // async requestOTP(user) {
  //   user.otp = generateOTP();
  //   user.save();
  //   return user;
  // }

  // async validateUser(email) {
  //   const user = await this.userService.findByEmail(email);

  //   // if (user && user.otp === otp) {
  //   //   return user;
  //   // }

  //   throw new UnauthorizedException();
  // }

  // async clearOTP(user) {
  //   return this.userService.update(user, {
  //     otp: ''
  //   })
  // }

  // async postLogin(user, { deviceId }) {
  //   const updateObj = user.devices.length == 2 && !user.devices.includes(deviceId)
  //     ? { devices: [deviceId]}
  //     : { $addToSet: { devices: deviceId } };
  //   return await this.userService.update(user, updateObj);
  // }

  // async validateAuth(payload) {
  //   return this.userService.findById(payload._id);
  // }



