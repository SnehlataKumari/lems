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
const acceptRequestSchema = Joi.object({
    accept: Joi.boolean()
});
let TeachersController = (() => {
    let TeachersController = class TeachersController extends resource_controller_1.ResourceController {
        constructor(service, userService) {
            super(service);
            this.userService = userService;
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
    TeachersController = __decorate([
        common_1.Controller('teachers'),
        __metadata("design:paramtypes", [teachers_service_1.TeachersService,
            users_service_1.UsersService])
    ], TeachersController);
    return TeachersController;
})();
exports.TeachersController = TeachersController;
//# sourceMappingURL=teachers.controller.js.map