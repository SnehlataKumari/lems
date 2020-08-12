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
const jwt_1 = require("@nestjs/jwt");
const sms_service_1 = require("../services/sms.service");
const version_service_1 = require("../services/version.service");
const tokens_service_1 = require("../services/tokens.service");
const config_1 = require("@nestjs/config");
const email_service_1 = require("../services/email.service");
const Joi = require("@hapi/joi");
const joivalidation_decorators_1 = require("../decorators/joivalidation.decorators");
const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const passwordSchema = Joi.string()
    .pattern(passwordExpression)
    .required();
const userSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required(),
    password: passwordSchema,
    email: Joi.string()
        .trim()
        .lowercase()
        .email(),
});
let AuthController = (() => {
    let AuthController = class AuthController {
        constructor(config, service, usersService, tokensService, jwtService, emailService, smsService, versionService) {
            this.config = config;
            this.service = service;
            this.usersService = usersService;
            this.tokensService = tokensService;
            this.jwtService = jwtService;
            this.emailService = emailService;
            this.smsService = smsService;
            this.versionService = versionService;
        }
        get hostUrl() {
            return this.config.get('HOST_URL');
        }
        async signUp(req) {
            const { email, password, name } = req;
            const tokenType = 'VERIFY_EMAIL';
            const hash = await this.service.encryptPassword(password);
            const user = await this.usersService.create({
                email,
                password: hash,
                name,
            });
            const users = this.usersService.getPublicDetails(user);
            const token = this.jwtService.sign(users);
            await this.tokensService.create({ token, type: tokenType });
            const link = `${this.hostUrl}/auth/verify/${token}`;
            await this.emailService.sendVerificationLink(users, link);
            return {
                message: 'Verification link sent to your email!',
                users,
            };
        }
        async resendVerificationLink(requestBody) {
            const tokenType = 'VERIFY_EMAIL';
            const { email } = requestBody;
            const userModel = await this.usersService.findByEmail(email);
            if (!userModel) {
                throw new common_1.UnauthorizedException('Email not found!');
            }
            if (userModel.isEmailVerified) {
                throw new common_1.BadRequestException('Email is already verified!');
            }
            const users = this.usersService.getPublicDetails(userModel);
            const token = this.jwtService.sign(users);
            await this.tokensService.create({ token, type: tokenType });
            const link = `${this.hostUrl}/auth/verify/${token}`;
            await this.emailService.sendVerificationLink(users, link);
            return 'Verification link sent successfully!';
        }
        async verify(token) {
            const tokenType = 'VERIFY_EMAIL';
            const user = this.jwtService.verify(token);
            const isTokenExist = await this.tokensService.findByTokenAndType(token, tokenType);
            if (!isTokenExist) {
                throw new common_1.UnauthorizedException('Invalid token!');
            }
            await this.tokensService.findByTokenAndTypeAndDelete(token, tokenType);
            const id = user._id;
            if (user) {
                await this.usersService.findByIdAndUpdate(id, { isEmailVerified: true });
                return `Email <b>${user.email}</b> Verified Successfully`;
            }
        }
        async login(user) {
            const tokenType = 'LOGIN';
            const userModel = await this.service.login(user);
            const token = this.jwtService.sign(userModel.toJSON());
            await this.tokensService.create({ token, type: tokenType });
            const users = this.usersService.getPublicDetails(userModel);
            return utils_1.success('logged in successfully!', { users, token });
        }
        async forgot(body) {
            const tokenType = 'FORGOT_PASSWORD';
            const userModel = await this.usersService.findByEmail(body.email.toLowerCase());
            if (!userModel) {
                throw new common_1.UnauthorizedException('Email not found!');
            }
            const user = this.usersService.getPublicDetails(userModel);
            const token = this.jwtService.sign(user);
            await this.tokensService.create({ token, type: tokenType });
            return token;
        }
        async resetPassword(requestBody) {
            const { password, token } = requestBody;
            const tokenType = 'FORGOT_PASSWORD';
            const verifyToken = this.jwtService.verify(token);
            const isTokenExist = await this.tokensService.findByTokenAndType(token, tokenType);
            if (!isTokenExist) {
                throw new common_1.UnauthorizedException('Invalid token!');
            }
            await this.tokensService.findByTokenAndTypeAndDelete(token, tokenType);
            await this.usersService.validatePassword(password);
            const hash = await this.service.encryptPassword(password);
            await this.usersService.findByIdAndUpdate(verifyToken._id, {
                password: hash,
            });
            return utils_1.success('Password reset successful!', {});
        }
    };
    __decorate([
        joivalidation_decorators_1.JoiValidation(userSchema),
        common_1.Post('sign-up'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signUp", null);
    __decorate([
        common_1.Post('resend-verification-email'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resendVerificationLink", null);
    __decorate([
        common_1.Get('verify/:token'),
        __param(0, common_1.Param('token')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "verify", null);
    __decorate([
        common_1.Post('login'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "login", null);
    __decorate([
        common_1.Post('forgot-password'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "forgot", null);
    __decorate([
        common_1.Post('reset-password'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resetPassword", null);
    AuthController = __decorate([
        common_1.Controller('auth'),
        __metadata("design:paramtypes", [config_1.ConfigService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            tokens_service_1.TokensService,
            jwt_1.JwtService,
            email_service_1.EmailService,
            sms_service_1.SmsService,
            version_service_1.VersionService])
    ], AuthController);
    return AuthController;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map