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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const db_service_1 = require("./db.service");
const sms_service_1 = require("./sms.service");
const email_service_1 = require("./email.service");
let OtpService = (() => {
    let OtpService = class OtpService extends db_service_1.DBService {
        constructor(model, smsService, emailService) {
            super(model);
            this.smsService = smsService;
            this.emailService = emailService;
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
    };
    OtpService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_2.InjectModel('Otp')),
        __metadata("design:paramtypes", [mongoose_1.Model,
            sms_service_1.SmsService,
            email_service_1.EmailService])
    ], OtpService);
    return OtpService;
})();
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map