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
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("../services/auth.service");
const tokens_service_1 = require("../services/tokens.service");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const joivalidation_decorator_1 = require("../decorators/joivalidation.decorator");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const loggedinuser_decorator_1 = require("../decorators/loggedinuser.decorator");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const users_service_1 = require("../services/users.service");
const otp_service_1 = require("../services/otp.service");
const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const passwordSchema = Joi.string()
    .pattern(passwordExpression);
const userSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .trim()
        .min(3)
        .max(30),
    phone: Joi.string()
        .trim()
        .min(10)
        .max(10)
        .required(),
    password: passwordSchema,
    email: Joi.string()
        .trim()
        .lowercase()
        .email(),
    gender: Joi.string(),
});
const teacherSchema = Joi.object({
    user: userSchema,
}).unknown(true);
let AuthController = (() => {
    let AuthController = class AuthController {
        constructor(config, tokenService, service, userService, otpService, tokensService) {
            this.config = config;
            this.tokenService = tokenService;
            this.service = service;
            this.userService = userService;
            this.otpService = otpService;
            this.tokensService = tokensService;
        }
        get hostUrl() {
            return this.config.get('HOST_URL');
        }
        async signUp(requestBody) {
            return await this.service.signUp(requestBody);
        }
        async signUpStudent(requestBody) {
            return await this.service.signUp(requestBody);
        }
        async socialSignUpStudent(requestBody) {
            return await this.service.socialSignupStudent(requestBody);
        }
        async signupTeacher(requestBody, files) {
            return await this.service.signUpTeacher(requestBody, files);
        }
        async resendVerificationLink(requestBody) {
            const { email } = requestBody;
            return await this.service.resendVerificationLink(email);
        }
        async login(requestBody) {
            const { email, password } = requestBody;
            return await this.service.login({ email, password });
        }
        async loginAdmin(requestBody) {
            const { email, password } = requestBody;
            return await this.service.login({ email, password }, 'ADMIN');
        }
        async loginUser(requestBody) {
            const { email, password } = requestBody;
            return await this.service.login({ email, password }, 'TEACHER');
        }
        async verify(token, res) {
            return await this.service.verifyToken(token, res);
        }
        async forgot(requestBody) {
            const { email } = requestBody;
            return await this.service.forgotPassword(email, 'TEACHER');
        }
        async forgotAdmin(requestBody) {
            const { email } = requestBody;
            return await this.service.forgotPassword(email, 'ADMIN');
        }
        async forgotStudent(requestBody) {
            const { email } = requestBody;
            return await this.service.forgotPassword(email, 'STUDENT');
        }
        async resetPassword(requestBody) {
            const { currentPassword, token } = requestBody;
            return await this.service.resetPassword(currentPassword, token);
        }
        async logout(loggedInUser) {
            const tokenType = constants_1.TOKEN_TYPES['LOGIN'].key;
            await this.tokensService.deleteUsersToken(loggedInUser, tokenType);
            return utils_1.success('logged out successfully!', {});
        }
        async changePassword(req, requestBody) {
            const { user: loggedInUser } = req;
            return await this.service.changePassword(loggedInUser, requestBody);
        }
        async editProfile(req, requestBody) {
            const { user: loggedInUser } = req;
            return await this.service.editProfile(loggedInUser, requestBody);
        }
        async getUserModel(requestBody) {
            const joiSchema = Joi.object().keys({
                email: Joi.string().email()
            });
            const { emailOrMobile } = requestBody;
            let where;
            const joiValidation = joiSchema.validate({ email: emailOrMobile });
            if (!joiValidation.error) {
                where = {
                    email: emailOrMobile
                };
            }
            if (emailOrMobile.length === 10 && parseInt(emailOrMobile, 10) !== NaN) {
                where = {
                    phone: emailOrMobile
                };
            }
            if (!where) {
                throw new common_1.BadRequestException('Please provide valid email or mobile');
            }
            const userModel = await this.userService.findOne(where);
            if (!userModel) {
                throw new common_1.UnauthorizedException('User not registered!');
            }
            return userModel;
        }
        async sendOtp(requestBody) {
            let otpModel = await this.otpService.findOne({
                emailOrMobile: requestBody.emailOrMobile
            });
            if (!otpModel) {
                otpModel = await this.otpService.create({
                    emailOrMobile: requestBody.emailOrMobile,
                    otp: this.otpService.generateOtp()
                });
            }
            if (utils_1.isEmail(otpModel.emailOrMobile)) {
                await this.otpService.sendOtpToEmail(otpModel.emailOrMobile, otpModel.otp);
            }
            else if (utils_1.isMobile(otpModel.emailOrMobile)) {
                await this.otpService.sendOtpToMobile(otpModel.emailOrMobile, otpModel.otp);
            }
            return utils_1.success('Otp sent!', {});
        }
        async otpLogin(requestBody) {
            const tokenType = constants_1.TOKEN_TYPES['LOGIN'].key;
            const otpModel = await this.otpService.findOne(requestBody);
            if (!otpModel) {
                throw new common_1.UnauthorizedException('Otp not matched!');
            }
            await this.otpService.removeModel(otpModel);
            let where = {};
            if (utils_1.isEmail(requestBody.emailOrMobile)) {
                where = {
                    email: requestBody.emailOrMobile
                };
            }
            else {
                where = {
                    phone: requestBody.emailOrMobile
                };
            }
            const userModel = await this.userService.findOne(where);
            if (!userModel) {
                return utils_1.success('OTP verified', where);
            }
            await this.otpService.delete(requestBody);
            const token = this.service.getUserToken(userModel.toJSON());
            await this.tokenService.delete({
                type: tokenType,
                userId: userModel._id,
            });
            await this.tokenService.create({
                token,
                type: tokenType,
                userId: userModel._id,
            });
            const user = this.userService.getPublicDetails(userModel);
            return utils_1.success('logged in successfully!', { user, token });
        }
        socialLoginStudent(requestBody) {
            return this.service.socialLoginStudent(requestBody);
        }
    };
    __decorate([
        joivalidation_decorator_1.JoiValidation(userSchema),
        common_1.Post('sign-up'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signUp", null);
    __decorate([
        common_1.Post('sign-up-student'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signUpStudent", null);
    __decorate([
        common_1.Post('social-signup-student'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "socialSignUpStudent", null);
    __decorate([
        common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
            { name: 'resumeFile', maxCount: 1 },
            { name: 'internetConnectionFile', maxCount: 1 },
        ])),
        common_1.Post('signup-teacher'),
        __param(0, common_1.Body()), __param(1, common_1.UploadedFiles()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signupTeacher", null);
    __decorate([
        common_1.Post('resend-verification-email'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resendVerificationLink", null);
    __decorate([
        common_1.Post('login'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "login", null);
    __decorate([
        common_1.Post('login-admin'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "loginAdmin", null);
    __decorate([
        common_1.Post('login-teacher'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "loginUser", null);
    __decorate([
        common_1.Get('verify/:token'),
        __param(0, common_1.Param('token')), __param(1, common_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "verify", null);
    __decorate([
        common_1.Post('forgot-password-teacher'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "forgot", null);
    __decorate([
        common_1.Post('forgot-password-admin'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "forgotAdmin", null);
    __decorate([
        common_1.Post('forgot-password-student'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "forgotStudent", null);
    __decorate([
        common_1.Post('reset-password'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resetPassword", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post('logout'),
        __param(0, loggedinuser_decorator_1.LoggedInUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "logout", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post('change-password'),
        __param(0, common_1.Req()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "changePassword", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
            { name: 'profileFile', maxCount: 1 },
        ])),
        common_1.Put('edit-profile-teacher'),
        __param(0, common_1.Req()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "editProfile", null);
    __decorate([
        common_1.Post('send-otp'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "sendOtp", null);
    __decorate([
        common_1.Post('otp-login'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "otpLogin", null);
    __decorate([
        common_1.Post('social-login-student'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "socialLoginStudent", null);
    AuthController = __decorate([
        common_1.Controller('auth'),
        __metadata("design:paramtypes", [config_1.ConfigService,
            tokens_service_1.TokensService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            otp_service_1.OtpService,
            tokens_service_1.TokensService])
    ], AuthController);
    return AuthController;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map