import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtTokenAuthGuard extends AuthGuard('jwt') {}
