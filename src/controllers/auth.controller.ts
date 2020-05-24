import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { AuthService } from "src/services/auth.service";
import { success } from "src/utils";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService, private usersService: UsersService) {}

  @Post('request-otp')
  async requestOtp(@Body() requestBody) {
    const { userId } = requestBody;
    const user = await this.usersService.findById(userId);
    return success('Otp generated successfully!', this.service.requestOTP(user));
  }

  @UseGuards(AuthGuard('otpStrategy'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}