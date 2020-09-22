import { NodeMailerService } from './nodemailer.service';
import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class EmailService {
  constructor(private nodeMailerService: NodeMailerService) {}

  async sendEmail(to, subject, text) {
    this.nodeMailerService.sendEmail(to, subject, text);
  }

  gettemplatePaths(templateName) {
    return path.join(__dirname, '../../mail-templates', `${templateName}.html`);
  }

  getFileData(templateName) {
    return readFileSync(this.gettemplatePaths(templateName),'utf8').toString();
  }

  getHandlebarTemplate(templateName) {
    return Handlebars.compile(this.getFileData(templateName));
  }

  getTemlateVerificationLinkTemplate(user, link) {
    const template = this.getHandlebarTemplate('verify-email');
    return template({link, name: user.firstName});
  }

  getTemlateResetPasswordLinkTemplate(user, link) {
    const template = this.getHandlebarTemplate('forgot-password');
    return template({link, name: user.firstName});
  }

  async sendVerificationLink(user, link) {
    const subject = `Email verification`;
    const text = this.getTemlateVerificationLinkTemplate(user, link);
    await this.sendEmail(user.email, subject, text);
  }
  
  async sendResetPasswordLink(user, link) {
    const subject = `Reset Password Link`;
    const text = this.getTemlateResetPasswordLinkTemplate(user, link);
    await this.sendEmail(user.email, subject, text);
  }
  
  async sendUpdatedPasswordNotification(userModel, currentPassword, link) {
    const subject = `Updated New Password`;
    const email = userModel.email;
    const text = `
      <h1> ${email } is your Email And "${currentPassword}" is your new password.
      You can login by now</h1>
      <a href='${link}' >${link}</a>
    `;
    await this.sendEmail(email, subject, text);
  }

  async sendOtp(userModel) {
    const otp = userModel.otp;
    const email = userModel.email;
    const subject = 'OTP to login';
    
    if(!email) {
      return;
    }

    const html = `
      <h1>${otp}</h1> is your otp to login.
    `
    await this.sendEmail(email, subject, html);

  }
}
