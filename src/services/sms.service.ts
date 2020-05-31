import { Injectable } from "@nestjs/common";
import * as twilio from "twilio";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SmsService {
  
  twilioAccountSid; 
  twilioAuthToken;
  client;
  
  constructor(
    private config: ConfigService
  ) {
    this.twilioAccountSid = this.config.get('twilioAccountSid');
    this.twilioAuthToken = this.config.get('twilioAuthToken');

    this.client = twilio(this.twilioAccountSid, this.twilioAuthToken);
  }

  async sendMessage ({body, to}) {
    return this.client.messages.create({
      body,
      to,  // Text this number
      from: '+12058830527' // From a valid Twilio number
    });
  }

  async sendOtp(user) {
    const body = `Your otp to login in rehani app is ${user.otp}`;
    const to = `+91${user.mobileNumber}`;
    return this.sendMessage({
      body, to
    })
  }
}