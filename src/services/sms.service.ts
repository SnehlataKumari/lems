import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import { TwillioService } from "./twillio.service";
import { DummySmsService } from "./dummySms.service";

@Injectable()
export class SmsService {
  constructor(
    // private twillioService: TwillioService,
    private dummySmsService: DummySmsService,
    private config: ConfigService
  ) { }

  getClient() {
    return this[this.config.get('smsService')];
  }

  async sendMessage ({body, to}) {
    return this.getClient().sendMessage({ body, to });
  }

  async sendOtp(user) {
    const body = `Your otp to login in rehani app is ${user.otp}`;
    const to = `+91${user.mobileNumber}`;
    return this.sendMessage({
      body, to
    })
  }
}