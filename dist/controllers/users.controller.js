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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const resource_controller_1 = require("./resource.controller");
const utils_1 = require("../utils");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
let UsersController = (() => {
    let UsersController = class UsersController extends resource_controller_1.ResourceController {
        constructor(service, authService, emailsService) {
            super(service);
            this.authService = authService;
            this.emailsService = emailsService;
        }
        findAll() {
            return utils_1.success('List found successfully', this.service.findAll());
        }
        async getUserDetails(req) {
            const { user: loggedInUser } = req;
            const studentModel = await this.service.findById(loggedInUser._id).populate('userId');
            return utils_1.success('Teacher found!', this.service.getPublicDetails(studentModel));
        }
        async getUsersDetails(userId) {
            const userModel = await this.service.findById(userId);
            return utils_1.success('user found!', {
                user: this.service.getPublicDetails(userModel)
            });
        }
        async updatePassword(userId, requestBody) {
            const { currentPassword } = requestBody;
            await this.authService.updatePassword(userId, currentPassword);
            return await this.afterUpdatePassword(userId, currentPassword);
        }
        async afterUpdatePassword(userId, currentPassword) {
            const userModel = await this.service.findById(userId);
            const email = userModel.email;
            const role = userModel.role;
            const link = `${this.authService.hostUrl(role)}`;
            await this.emailsService.sendUpdatedPasswordNotification(userModel, currentPassword, link);
            return {
                message: `Password sent to ${userModel.firstName}'s email!`,
            };
        }
    };
    __decorate([
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UsersController.prototype, "findAll", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('get-user-details'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "getUserDetails", null);
    __decorate([
        common_1.Get(':userId/get-user-details'),
        __param(0, common_1.Param('userId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "getUsersDetails", null);
    __decorate([
        common_1.Post(':userId/update-password'),
        __param(0, common_1.Param('userId')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "updatePassword", null);
    UsersController = __decorate([
        common_1.Controller('users'),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            auth_service_1.AuthService,
            email_service_1.EmailService])
    ], UsersController);
    return UsersController;
})();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map