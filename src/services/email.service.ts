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

  getTemplate(templateName, obj) {
    const template = this.getHandlebarTemplate(templateName);
    return template(obj);
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
    const html = this.getTemplate('updated-password', { name: userModel.firstName, password: currentPassword, link, email: userModel.email });
    await this.sendEmail(userModel.email, subject, html);
  }

  async sendRegistrationAccepted(userModel, { password, hostUrl }) {
    const subject = 'Your registration has been accepted!';
    const html = this.getTemplate('registration-accepted', { password, link: hostUrl, name: userModel.firstName, email: userModel.email});
    await this.sendEmail(userModel.email, subject, html);
  }

  async sendRegistrationRejected(userModel) {
    const subject = 'Your registration has been rejected!';
    const html = this.getTemplate('registration-rejected', { name: userModel.firstName});
    await this.sendEmail(userModel.email, subject, html);
  }

  async sendOtp(userModel) {
    const otp = userModel.otp;
    const email = userModel.email;
    return this.sendOtpToEmail(email, otp);
  }

  async sendOtpToEmail(email, otp) {
    const subject = 'OTP to login';

    if (!email) {
      return;
    }

    const html = `
      <h1>${otp}</h1> is your otp to login.
    `
    return await this.sendEmail(email, subject, html);
  }
}
