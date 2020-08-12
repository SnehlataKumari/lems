import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_CONSTANTS } from 'src/constants';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONSTANTS.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request as any);
    const isValidToken = await this.authService.isValidAuthToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Token not found!');
    }

    return await this.authService.getUserById(payload._id);
  }
}
