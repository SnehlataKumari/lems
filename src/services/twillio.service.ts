import { Injectable } from "@nestjs/common";
import * as twilio from "twilio";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TwillioService {

  twilioAccountSid;
  twilioAuthToken;
  client;

  constructor(
    private config: ConfigService
  ) {
    this.twilioAccountSid = this.config.get('TwilioAccountSid');
    this.twilioAuthToken = this.config.get('TwilioAuthToken');
    this.client = twilio(this.twilioAccountSid, this.twilioAuthToken);
  }

  async sendMessage({ body, to }) {
    return this.client.messages.create({
      body,
      to,  // Text this number
      from: '+12058830527' // From a valid Twilio number
    });
  }
}