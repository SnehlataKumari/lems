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
exports.TeachersController = void 0;
const common_1 = require("@nestjs/common");
const teachers_service_1 = require("../services/teachers.service");
const resource_controller_1 = require("./resource.controller");
const utils_1 = require("../utils");
const Joi = require("@hapi/joi");
const joivalidation_pipe_1 = require("../pipes/joivalidation.pipe");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const users_service_1 = require("../services/users.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
const acceptRequestSchema = Joi.object({
    accept: Joi.boolean()
});
let TeachersController = (() => {
    let TeachersController = class TeachersController extends resource_controller_1.ResourceController {
        constructor(service, authService, userService, emailService) {
            super(service);
            this.authService = authService;
            this.userService = userService;
            this.emailService = emailService;
        }
        findAll() {
            return utils_1.success('List found successfully', this.service.findAll());
        }
        async getTeacherDetails(req) {
            const { user: loggedInUser } = req;
            const teacherModel = await this.service.findOne({
                userId: loggedInUser._id
            }).populate('userId');
            return utils_1.success('Teacher found!', this.service.getPublicDetails(teacherModel));
        }
        async findById(req) {
            const teacherId = req.teacherId;
            return utils_1.success('List found successfully', this.service.findById(teacherId));
        }
        async getTeachersDetails(teacherId) {
            const teacherModel = await this.service.findById(teacherId);
            const userModel = await this.userService.findById(teacherModel.userId);
            return utils_1.success('Teacher found!', {
                teacher: this.service.getPublicDetails(teacherModel),
                user: this.userService.getPublicDetails(userModel)
            });
        }
        async deleteTeacherById(teacherId) {
            await this.service.deleteTeacherById(teacherId);
            return utils_1.success('Teacher deleted successfully', {});
        }
        async acceptRejectRegistrationRequest(requestBody, teacherId) {
            return await this.service.hasAcceptedRegistrationRequest(requestBody, teacherId);
        }
        async editTeacherProfile(requestBody, token) {
            await this.service.editTeacherProfile(requestBody, token);
            return utils_1.success('Profile updated successfully', {});
        }
        async updateProfile(teacherId, requestBody) {
            return await this.service.updateProfile(teacherId, requestBody);
        }
        async updateResource(id, resourceObject) {
            return utils_1.success('Resource updated successfully!', this.service.findByIdAndUpdate(id, resourceObject));
        }
        async acceptRegistrationRequest(id) {
            const teacherModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRegistrationRequest: true });
            const randomPassword = this.authService.getRandomPassword();
            const userModel = await this.authService.updatePassword(teacherModel.userId, randomPassword);
            this.emailService.sendRegistrationAccepted(userModel, { password: randomPassword, hostUrl: this.authService.hostUrl(userModel.role) });
            return utils_1.success('Teacher registration accepted successfully!', this.service.getPublicDetails(teacherModel));
        }
        async rejectRegistrationRequest(id) {
            const teacherModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRegistrationRequest: false });
            const userModel = await this.userService.findById(teacherModel.userId);
            await this.emailService.sendRegistrationRejected(userModel);
            return utils_1.success('Teacher registration rejected successfully!', teacherModel);
        }
    };
    __decorate([
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TeachersController.prototype, "findAll", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('get-teacher-details'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "getTeacherDetails", null);
    __decorate([
        common_1.Get(':teacherId'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "findById", null);
    __decorate([
        common_1.Get(':teacherId/get-teacher-details'),
        __param(0, common_1.Param('teacherId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "getTeachersDetails", null);
    __decorate([
        common_1.Delete(':teacherId'),
        __param(0, common_1.Param('teacherId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "deleteTeacherById", null);
    __decorate([
        common_1.Post(':teacherId/accept-reject-registration-request'),
        __param(0, common_1.Body(new joivalidation_pipe_1.JoiValidationPipe(acceptRequestSchema))), __param(1, common_1.Param('teacherId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "acceptRejectRegistrationRequest", null);
    __decorate([
        common_1.Put('edit-teacher-profile'),
        __param(0, common_1.Body()), __param(1, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "editTeacherProfile", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
            { name: 'profileFile', maxCount: 1 },
        ])),
        common_1.Put(`:teacherId/update-profile`),
        __param(0, common_1.Param('teacherId')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "updateProfile", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Put('/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "updateResource", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Put('/:teacherId/accept-registration-request'),
        __param(0, common_1.Param('teacherId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "acceptRegistrationRequest", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Put('/:teacherId/reject-registration-request'),
        __param(0, common_1.Param('teacherId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeachersController.prototype, "rejectRegistrationRequest", null);
    TeachersController = __decorate([
        common_1.Controller('teachers'),
        __metadata("design:paramtypes", [teachers_service_1.TeachersService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            email_service_1.EmailService])
    ], TeachersController);
    return TeachersController;
})();
exports.TeachersController = TeachersController;
//# sourceMappingURL=teachers.controller.js.map