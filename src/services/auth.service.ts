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
}
