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
let EmailService = (() => {
    let EmailService = class EmailService {
        constructor(nodeMailerService) {
            this.nodeMailerService = nodeMailerService;
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
        async sendResetPasswordLink(user, link) {
            const subject = `Reset Password Link`;
            const text = `
      <h1>Please click this link to reset your password</h1>
      <a href='${link}'>${link}</a>
    `;
            await this.sendEmail(user.email, subject, text);
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