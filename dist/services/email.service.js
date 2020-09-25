"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_service_1 = require("./nodemailer.service");
const common_1 = require("@nestjs/common");
const Handlebars = require("handlebars");
const path = require("path");
const fs_1 = require("fs");
let EmailService = (() => {
    let EmailService = class EmailService {
        constructor(nodeMailerService) {
            this.nodeMailerService = nodeMailerService;
        }
        async sendEmail(to, subject, text) {
            this.nodeMailerService.sendEmail(to, subject, text);
        }
        gettemplatePaths(templateName) {
            return path.join(__dirname, '../../mail-templates', `${templateName}.html`);
        }
        getFileData(templateName) {
            return fs_1.readFileSync(this.gettemplatePaths(templateName), 'utf8').toString();
        }
        getHandlebarTemplate(templateName) {
            return Handlebars.compile(this.getFileData(templateName));
        }
        getTemlateVerificationLinkTemplate(user, link) {
            const template = this.getHandlebarTemplate('verify-email');
            return template({ link, name: user.firstName });
        }
        getTemlateResetPasswordLinkTemplate(user, link) {
            const template = this.getHandlebarTemplate('forgot-password');
            return template({ link, name: user.firstName });
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
            const html = this.getTemplate('registration-accepted', { password, link: hostUrl, name: userModel.firstName, email: userModel.email });
            await this.sendEmail(userModel.email, subject, html);
        }
        async sendRegistrationRejected(userModel) {
            const subject = 'Your registration has been rejected!';
            const html = this.getTemplate('registration-rejected', { name: userModel.firstName });
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
    `;
            return await this.sendEmail(email, subject, html);
        }
    };
    EmailService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [nodemailer_service_1.NodeMailerService])
    ], EmailService);
    return EmailService;
})();
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map