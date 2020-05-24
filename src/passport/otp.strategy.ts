import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { Request } from 'express';

@Injectable()
export class OTPStrategy extends PassportStrategy(Strategy, 'otpStrategy') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const {mobileNumber, otp} = req.body;
    const user = await this.authService.validateUser(mobileNumber, otp);
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.authService.clearOTP(user);
  }
  
}