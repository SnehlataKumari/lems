import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtTokenAuthGuard } from 'src/passport/jwttokenauth.guard';

export function ValidateToken() {
  return applyDecorators(UseGuards(JwtTokenAuthGuard));
}
