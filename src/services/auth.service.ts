import { Injectable, UnauthorizedException } from "@nestjs/common";
import { generateOTP } from "src/utils";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService) {}

  async requestOTP(user) {
    user.otp = generateOTP();
    user.save();
    return user;
  }

  async validateUser(mobileNumber, otp) {
    const user = await this.userService.findByMobileNumber(mobileNumber);
    
    if (user && user.otp === otp) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async clearOTP(user) {
    return this.userService.update(user, {
      otp: ''
    })
  }

  async postLogin(user, { deviceId }) {
    const updateObj = user.devices.length == 2 && !user.devices.includes(deviceId)
      ? { devices: [deviceId]}
      : { $addToSet: { devices: deviceId } };
    return await this.userService.update(user, updateObj);
  }

  async validateAuth(payload) {
    return this.userService.findById(payload._id);
  }


}
