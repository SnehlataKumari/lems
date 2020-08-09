import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { Request } from 'express';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class OTPStrategy extends PassportStrategy(Strategy, 'otpStrategy') {
  constructor(
    private authService: AuthService
  ) {
    super();
  }

  // async validate(req: Request): Promise<any> {
  //   const { email } = req.body;
  //   const user = await this.authService.validateUser(email);
  //   // if (!user) {
  //   //   throw new UnauthorizedException('Otp not matched!');
  //   // }

  //   // if (!deviceId) {
  //   //   throw new UnauthorizedException('Device id is required!');
  //   // }

  //   // await this.authService.postLogin(user, { deviceId });
  //   return await this.authService.clearOTP(user);
  // }
  
  
  
}