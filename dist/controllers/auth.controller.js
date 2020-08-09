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
const auth_guard_1 = require("../passport/auth.guard");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../schemas/user.schema");
const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const schema = Joi.object({
    name: Joi
        .string()
        .trim()
        .min(3)
        .max(30)
        .required(),
    password: Joi
        .string()
        .pattern(passwordExpression)
        .required(),
    email: Joi.string().trim().lowercase().email()
});
let AuthController = (() => {
    let AuthController = class AuthController {
        constructor(service, usersService, jwtService, smsService, versionService) {
            this.service = service;
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.smsService = smsService;
            this.versionService = versionService;
        }
        async signUp(req) {
            const { email, password, name } = req;
            let value;
            try {
                value = await schema.validateAsync({ name: name, email: email, password: password });
            }
            catch (err) {
                console.log(err);
                throw new common_1.BadRequestException(err.message);
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const user = await this.usersService.create({ email, password: hash, name });
            const users = this.usersService.getPublicDetails(user);
            const verifyEmail = this.jwtService.sign(user.toJSON());
            const link = `http://localhost:3000/auth/verify/${verifyEmail}`;
            return {
                link,
                message: "signed up successfully!",
                users
            };
        }
        async verify(token) {
            const user = this.jwtService.verify(token);
            const id = user._id;
            console.log(id, 'id');
            if (user) {
                await this.usersService.findByIdAndUpdate(id, { isEmailVerified: true });
                return `Email <b>${user.email}</b> Verified Successfully`;
            }
        }
        async login(user) {
            const data = await this.service.login(user);
            return utils_1.success('logged in successfully!', data.email);
        }
    };
    __decorate([
        common_1.Post('sign-up'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signUp", null);
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
    AuthController = __decorate([
        common_1.Controller('auth'),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            users_service_1.UsersService,
            jwt_1.JwtService,
            sms_service_1.SmsService,
            version_service_1.VersionService])
    ], AuthController);
    return AuthController;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map