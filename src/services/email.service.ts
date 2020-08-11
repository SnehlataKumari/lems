import { NodeMailerService } from "./nodemailer.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(
    private nodeMailerService: NodeMailerService
  ) {
  }

  async sendEmail(to, subject, text) {
    this.nodeMailerService.sendEmail(to, subject, text);
  }

  async sendVerificationLink(user, link) {
    const subject = `Email verification`;
    const text = `
      <h1>Please click this link to verify your email</h1>
      <a href='${link}' >${link}</a>
    `;
    await this.sendEmail(user.email, subject, text);
  }
}