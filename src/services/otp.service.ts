import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { SmsService } from './sms.service';
import { EmailService } from './email.service';

@Injectable()
export class OtpService extends DBService {
  constructor(
    @InjectModel('Otp') model: Model<any>,
    private smsService: SmsService,
    private emailService: EmailService
  ) {
    super(model);
  }

  async sendOtpToMobile(phone, otp) {
    await this.smsService.sendOtpToMobile(phone, otp);
  }
  
  async sendOtpToEmail(email, otp) {
    await this.emailService.sendOtpToEmail(email, otp);
  }

  generateOtp() {
    return '0000';
  }
}