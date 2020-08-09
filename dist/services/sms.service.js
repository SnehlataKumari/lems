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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dummySms_service_1 = require("./dummySms.service");
let SmsService = (() => {
    let SmsService = class SmsService {
        constructor(dummySmsService, config) {
            this.dummySmsService = dummySmsService;
            this.config = config;
        }
        getClient() {
            return this[this.config.get('smsService')];
        }
        async sendMessage({ body, to }) {
            return this.getClient().sendMessage({ body, to });
        }
        async sendOtp(user) {
            const body = `Your otp to login in rehani app is ${user.otp}`;
            const to = `+91${user.mobileNumber}`;
            return this.sendMessage({
                body, to
            });
        }
    };
    SmsService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [dummySms_service_1.DummySmsService,
            config_1.ConfigService])
    ], SmsService);
    return SmsService;
})();
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map