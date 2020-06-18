import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { AuthService } from "src/services/auth.service";
import { success } from "src/utils";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';
import { SmsService } from "src/services/sms.service";

@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private smsService: SmsService
  ) {}

  @Post('request-otp')
  async requestOtp(@Body() requestBody) {
    try {
      const { mobileNumber } = requestBody;
      let user = await this.usersService.findByMobileNumber(mobileNumber);
  
      if(!user) {
        user = await this.usersService.create({mobileNumber});
      }
  
      const requestOtp = await this.service.requestOTP(user);
      await this.smsService.sendOtp(user);
      return success('Otp generated successfully!', requestOtp);
      
    } catch (error) {
      console.error(error);
      
      return 'Error'
    }
  }
  
  @Post('create-admin')
  async createAdmin(@Body() requestBody) {
    const { mobileNumber, name, password, username } = requestBody;
    console.log({mobileNumber});
    
    let user = await this.usersService.create({ mobileNumber, name, password, username, role: 'ADMIN' });
    console.log({user});
    
    return success('Admin created successfully!', { user, access_token: this.jwtService.sign(user.toJSON())});
  }
  
  @Post('login-admin')
  async loginAdmin(@Body() requestBody) {
    const { password, username } = requestBody;
    const user = await this.usersService.findOne({
      username,
      password,
      role: 'ADMIN'
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return success('Admin created successfully!', { user, access_token: this.jwtService.sign(user.toJSON())});
  }

  @UseGuards(AuthGuard('otpStrategy'))
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    return {
      access_token: this.jwtService.sign(user.toJSON()),
      user
    };
  }
}