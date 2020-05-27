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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const auth_service_1 = require("../services/auth.service");
const utils_1 = require("../utils");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let AuthController = (() => {
    let AuthController = class AuthController {
        constructor(service, usersService, jwtService) {
            this.service = service;
            this.usersService = usersService;
            this.jwtService = jwtService;
        }
        async requestOtp(requestBody) {
            const { mobileNumber } = requestBody;
            let user = await this.usersService.findByMobileNumber(mobileNumber);
            if (!user) {
                user = await this.usersService.create({ mobileNumber });
            }
            return utils_1.success('Otp generated successfully!', this.service.requestOTP(user));
        }
        async login(req) {
            const { user } = req;
            return {
                access_token: this.jwtService.sign(user.toJSON()),
                user
            };
            return req.user;
        }
    };
    __decorate([
        common_1.Post('request-otp'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "requestOtp", null);
    __decorate([
        common_1.UseGuards(passport_1.AuthGuard('otpStrategy')),
        common_1.Post('login'),
        __param(0, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "login", null);
    AuthController = __decorate([
        common_1.Controller('auth'),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            users_service_1.UsersService,
            jwt_1.JwtService])
    ], AuthController);
    return AuthController;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map