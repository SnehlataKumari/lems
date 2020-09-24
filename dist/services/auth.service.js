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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const bcrypt = require("bcryptjs");
const tokens_service_1 = require("./tokens.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const email_service_1 = require("./email.service");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const teachers_service_1 = require("./teachers.service");
const dbtransaction_service_1 = require("./dbtransaction.service");
const students_service_1 = require("./students.service");
const sms_service_1 = require("./sms.service");
const socialLogin_service_1 = require("./socialLogin.service");
let AuthService = (() => {
    let AuthService = class AuthService {
        constructor(userService, tokenService, configs, jwtService, emailsService, smsService, teacherService, transaction, socialLoginService, studentService) {
            this.userService = userService;
            this.tokenService = tokenService;
            this.configs = configs;
            this.jwtService = jwtService;
            this.emailsService = emailsService;
            this.smsService = smsService;
            this.teacherService = teacherService;
            this.transaction = transaction;
            this.socialLoginService = socialLoginService;
            this.studentService = studentService;
        }
        hostUrl(role) {
            if (role === 'ADMIN') {
                return this.configs.get('HOSTFE_URL_ADMIN');
            }
            if (role === 'STUDENT') {
                return this.configs.get('HOSTFE_URL_STUDENT');
            }
            if (role === 'TEACHER') {
                return this.configs.get('HOSTFE_URL_TEACHER');
            }
            return this.configs.get('HOSTFE_URL');
        }
        getUserToken(userObj) {
            return this.jwtService.sign(Object.assign(Object.assign({}, userObj), { profileImage: '' }));
        }
        async signUp(requestBody, role = 'STUDENT') {
            const tokenType = constants_1.TOKEN_TYPES['VERIFY_EMAIL'].key;
            const hash = await this.encryptPassword(String(requestBody.password));
            const userModel = await this.userService.create(Object.assign(Object.assign({}, requestBody), { password: hash }));
            const userObj = this.userService.getPublicDetails(userModel);
            const token = this.jwtService.sign(userObj);
            await this.tokenService.create({
                token,
                type: tokenType,
                userId: userModel._id,
            });
            if (role === 'STUDENT') {
                await this.studentService.create({ userId: userModel._id, });
            }
            const link = `${this.apiUrl(role)}/auth/verify/${token}`;
            const loginTokenType = constants_1.TOKEN_TYPES['LOGIN'].key;
            const loginToken = this.getUserToken(userModel.toJSON());
            await this.tokenService.delete({
                type: loginTokenType,
                userId: userModel._id,
            });
            await this.tokenService.create({
                token: loginToken,
                type: loginTokenType,
                userId: userModel._id,
            });
            await this.emailsService.sendVerificationLink(userModel, link);
            return utils_1.success('Verification link sent to your email!', { user: userObj, token: loginToken });
        }
        async socialSignupStudent(requestBody) {
            const userModel = await this.userService.create(Object.assign(Object.assign({}, requestBody), { isEmailVerified: true }));
            await this.studentService.create({ userId: userModel._id, });
            const tokenType = constants_1.TOKEN_TYPES['LOGIN'].key;
            const token = this.getUserToken(userModel.toJSON());
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
        async socialLoginStudent(requestBody) {
            const userModel = await this.userService.findOne({
                email: requestBody.email
            });
            if (!userModel) {
                throw new common_1.UnauthorizedException('User not registered!');
            }
            const tokenType = constants_1.TOKEN_TYPES['LOGIN'].key;
            const token = this.getUserToken(userModel.toJSON());
            await this.tokenService.delete({
                type: tokenType,
                userId: userModel._id,
            });
            await this.tokenService.create({
                token,
                type: tokenType,
                userId: userModel._id,
            });
            const userObj = this.userService.getPublicDetails(userModel);
            return utils_1.success('logged in successfully!', { user: userObj, token });
        }
        async signUpTeacher(requestBody, files) {
            let userModel;
            let teacherModel;
            const tokenType = constants_1.TOKEN_TYPES['VERIFY_EMAIL'].key;
            try {
                const { user: userObject, teacher: teacherObject } = requestBody;
                const hash = await this.encryptPassword(userObject.email);
                userModel = await this.userService.create(Object.assign(Object.assign({}, userObject), { password: hash, role: 'TEACHER' }));
                const user = this.userService.getPublicDetails(userModel);
                const token = this.jwtService.sign(user);
                await this.tokenService.create({
                    token,
                    type: tokenType,
                    userId: userModel._id,
                });
                const link = `${this.apiUrl(userModel.role)}/auth/verify/${token}`;
                const dateOfBirth = teacherObject.dateOfBirth;
                teacherModel = await this.teacherService.create(Object.assign(Object.assign({}, teacherObject), { userId: user._id, dateOfBirth: dateOfBirth, resume: files.resumeFile, screenShotOfInternet: files.internetConnectionFile }));
                await this.emailsService.sendVerificationLink(userModel, link);
                return {
                    message: 'Verification link for Teacher is sent to your email!',
                    user,
                };
            }
            catch (error) {
                if (userModel) {
                    await this.userService.removeModel(userModel);
                }
                if (teacherModel) {
                    await this.teacherService.removeModel(teacherModel);
                }
                throw error;
            }
        }
        apiUrl(role) {
            return this.configs.get('HOST_URL');
        }
        async verifyToken(token, res) {
            const tokenType = constants_1.TOKEN_TYPES['VERIFY_EMAIL'].key;
            const user = this.jwtService.verify(token);
            const isTokenExist = await this.tokenService.findByTokenAndType(token, tokenType);
            if (!isTokenExist) {
                return res.render('email-already-registered', { loginLink: this.hostUrl(user.role) });
            }
            await this.tokenService.findByTokenAndTypeAndDelete(token, tokenType);
            const id = user._id;
            if (user) {
                await this.userService.findByIdAndUpdate(id, { isEmailVerified: true });
                return res.render('thank-you', Object.assign(Object.assign({}, user), { loginLink: this.hostUrl(user.role) }));
            }
        }
        async resendVerificationLink(email, role = 'STUDENT') {
            const tokenType = constants_1.TOKEN_TYPES['VERIFY_EMAIL'].key;
            const userModel = await this.userService.findByEmail(email);
            if (!userModel) {
                throw new common_1.UnauthorizedException('Email not found!');
            }
            if (userModel.isEmailVerified) {
                throw new common_1.BadRequestException('Email is already verified!');
            }
            await this.tokenService.deleteUsersToken(userModel, tokenType);
            const userObj = this.userService.getPublicDetails(userModel);
            const token = this.getUserToken(userObj);
            await this.tokenService.create({
                token,
                type: tokenType,
                userId: userModel._id,
            });
            const link = `${this.hostUrl(role)}/auth/verify/${token}`;
            await this.emailsService.sendVerificationLink(userObj, link);
            return { message: 'Verification link sent successfully!' };
        }
        async login({ email, password }, role = 'STUDENT') {
            const tokenType = constants_1.TOKEN_TYPES['LOGIN'].key;
            const userModel = await this.userService.findOne({ email: email.toLowerCase(), role });
            if (!userModel) {
                throw new common_1.UnauthorizedException('User not registered!');
            }
            if (!userModel.isEmailVerified) {
                throw new common_1.UnauthorizedException('Please verify email to login!');
            }
            if (!userModel.password) {
                throw new common_1.UnauthorizedException('You have not setup password, Please reset password and then login again!');
            }
            const comparePassword = bcrypt.compareSync(password, userModel.password);
            if (!comparePassword) {
                throw new common_1.UnauthorizedException('wrong password!');
            }
            const token = this.getUserToken(userModel.toJSON());
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
        async forgotPassword(email, role = 'STUDENT') {
            const tokenType = constants_1.TOKEN_TYPES['FORGOT_PASSWORD'].key;
            const userModel = await this.userService.findOne({ email: email.toLowerCase(), role });
            if (!userModel) {
                throw new common_1.UnauthorizedException('User not found!');
            }
            const user = this.userService.getPublicDetails(userModel);
            const token = this.getUserToken(user);
            const forgotToken = await this.tokenService.create({
                token,
                type: tokenType,
                userId: userModel._id,
            });
            const link = `${this.hostUrl(role)}/reset-password/${token}`;
            await this.emailsService.sendResetPasswordLink(userModel, link);
            return {
                message: 'link sent to your email-address',
                forgotToken
            };
        }
        async resetPassword(currentPassword, token) {
            const tokenType = constants_1.TOKEN_TYPES['FORGOT_PASSWORD'].key;
            const verifyToken = this.jwtService.verify(token);
            const isTokenExist = await this.tokenService.findByTokenAndType(token, tokenType);
            if (!isTokenExist) {
                throw new common_1.UnauthorizedException('Invalid token!');
            }
            await this.tokenService.findByTokenAndTypeAndDelete(token, tokenType);
            const hash = await this.encryptPassword(currentPassword);
            await this.userService.findByIdAndUpdate(verifyToken._id, {
                password: hash,
            });
            return utils_1.success('Password reset successful!', {});
        }
        async encryptPassword(password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            return hash;
        }
        async isValidAuthToken(token) {
            return await this.tokenService.findByTokenAndType(token, constants_1.TOKEN_TYPES['LOGIN'].key);
        }
        getUserById(id) {
            return this.userService.findById(id);
        }
        async changePassword(loggedInUser, requestBody) {
            const { oldPassword, newPassword } = requestBody;
            const comparePassword = bcrypt.compareSync(oldPassword, loggedInUser.password);
            if (!comparePassword) {
                throw new common_1.UnauthorizedException('wrong password!');
            }
            const hashNewPassword = await this.encryptPassword(newPassword);
            return await this.userService.update(loggedInUser, { password: hashNewPassword });
        }
        async editProfile(loggedInUser, requestBody) {
            const userId = loggedInUser._id;
            const teacher = await this.teacherService.findOne({ userId: userId });
            if (!teacher) {
                throw new common_1.UnauthorizedException('user not found!');
            }
            const userModel = await this.userService.update(loggedInUser, requestBody.user);
            const teacherModel = await this.teacherService.update(teacher, requestBody.teacher);
            return {
                user: userModel,
                teacher: teacherModel
            };
        }
        async sendOtp(userModel) {
            const otp = '0000';
            await this.userService.update(userModel, {
                otp
            });
            await this.emailsService.sendOtp(userModel);
            await this.smsService.sendOtp(userModel);
        }
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            tokens_service_1.TokensService,
            config_1.ConfigService,
            jwt_1.JwtService,
            email_service_1.EmailService,
            sms_service_1.SmsService,
            teachers_service_1.TeachersService,
            dbtransaction_service_1.DBTransactionService,
            socialLogin_service_1.SocialLoginService,
            students_service_1.StudentsService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map