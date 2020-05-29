import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { AuthService } from "src/services/auth.service";
import { success } from "src/utils";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Post('request-otp')
  async requestOtp(@Body() requestBody) {
    const { mobileNumber } = requestBody;
    let user = await this.usersService.findByMobileNumber(mobileNumber);

    if(!user) {
      user = await this.usersService.create({mobileNumber});
    }

    return success('Otp generated successfully!', this.service.requestOTP(user));
  }

  @UseGuards(AuthGuard('otpStrategy'))
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    return {
      access_token: this.jwtService.sign(user.toJSON()),
      user
    };

    return req.user;
  }
}