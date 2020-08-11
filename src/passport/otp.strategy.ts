import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class OTPStrategy extends PassportStrategy(Strategy, 'otpStrategy') {
  constructor(
    private authService: AuthService
  ) {
    super();
  }
  
}