import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { JwtTokenAuthGuard } from 'src/passport/jwttokenauth.guard';

@Controller('payments')
export class PaymentsController extends ResourceController {
  constructor(service: UsersService) {
    super(service);
  }

  @UseGuards(JwtTokenAuthGuard)
  @Post('on-payment-successfull')
  async createPayment(@Req() req) {
    const { user, body } = req;
    user.payments.push({
      ...body,
    });

    user.isSubscribed = true;

    await user.save();
    return success('Payment recorded successfully', user);
  }
}
