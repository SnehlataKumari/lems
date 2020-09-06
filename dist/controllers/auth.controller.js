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
        constructor(config, service, tokensService) {
            this.config = config;
            this.service = service;
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
        async verify(token) {
            return await this.service.verifyToken(token);
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
            console.log(req, 'reqreqreqr');
            const { user: loggedInUser } = req;
            console.log(requestBody);
            return await this.service.editProfile(loggedInUser, requestBody);
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
        __param(0, common_1.Param('token')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
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
        common_1.Post('edit-profile'),
        __param(0, common_1.Req()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "editProfile", null);
    AuthController = __decorate([
        common_1.Controller('auth'),
        __metadata("design:paramtypes", [config_1.ConfigService,
            auth_service_1.AuthService,
            tokens_service_1.TokensService])
    ], AuthController);
    return AuthController;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map