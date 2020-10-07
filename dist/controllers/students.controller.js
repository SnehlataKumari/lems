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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const utils_1 = require("../utils");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const users_service_1 = require("../services/users.service");
const students_service_1 = require("../services/students.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
let StudentsController = (() => {
    let StudentsController = class StudentsController extends resource_controller_1.ResourceController {
        constructor(service, userService, config) {
            super(service);
            this.userService = userService;
            this.config = config;
        }
        async findAll() {
            const students = await this.service.findAll();
            const studentsList = students
                .filter((student) => !!student.userId)
                .map(student => {
                const userObj = this.userService.getPublicDetails(student.userId);
                const studentObj = this.service.getPublicDetails(student);
                return ({
                    user: userObj,
                    student: studentObj
                });
            });
            return utils_1.success('students found successfully', studentsList);
        }
        async deleteResource(id) {
            const studentModel = await this.service.findById(id);
            if (!studentModel) {
                throw new common_1.BadRequestException('Student not found!');
            }
            await this.userService.findByIdAndDelete(studentModel.userId);
            await this.service.findByIdAndDelete(id);
            return utils_1.success('Resource deleted successfully!', {
                id,
            });
        }
        async getTeacherDetails(req) {
            const { user: loggedInUser } = req;
            const teacherModel = await this.service.findOne({
                userId: loggedInUser._id
            }).populate('userId');
            return utils_1.success('Student found!', {
                student: this.service.getPublicDetails(teacherModel),
                user: this.userService.getPublicDetails(loggedInUser)
            });
        }
        async updateStudentProfile(studentId, requestBody) {
            let studentModel = await this.service.findById(studentId);
            if (!studentModel) {
                throw new common_1.BadRequestException('Student not found!');
            }
            let userModel = await this.userService.findById(studentModel.userId);
            if (!userModel) {
                throw new common_1.BadRequestException('User not found!');
            }
            userModel = await this.userService.update(userModel, requestBody.user);
            studentModel = await this.service.update(studentModel, requestBody.student);
            return utils_1.success('Student Profile updated successfully!', {
                user: this.userService.getPublicDetails(userModel),
                teacher: this.service.getPublicDetails(studentModel)
            });
        }
        async updateStudentProfilePic(studentId, file) {
            const hostUrl = this.config.get('HOST_URL');
            const profileImagePath = `${hostUrl}/${file.path}`;
            const studentModel = await this.service.findById(studentId);
            if (!studentModel) {
                throw new common_1.BadRequestException('Student not found!');
            }
            let userModel = await this.userService.findById(studentModel.userId);
            if (!userModel) {
                throw new common_1.BadRequestException('User not found!');
            }
            userModel = await this.userService.update(userModel, {
                profileImage: profileImagePath
            });
            return utils_1.success('Profile pic uploaded successfully!', {
                user: this.userService.getPublicDetails(userModel),
                student: this.service.getPublicDetails(studentModel)
            });
        }
        async updateStudentProfilePicBase64(studentId, file, requestBody) {
            const studentModel = await this.service.findById(studentId);
            if (!studentModel) {
                throw new common_1.BadRequestException('Student not found!');
            }
            let userModel = await this.userService.findById(studentModel.userId);
            if (!userModel) {
                throw new common_1.BadRequestException('User not found!');
            }
            userModel = await this.userService.update(userModel, {
                profileImage: requestBody.file
            });
            return utils_1.success('Profile pic uploaded successfully!', {
                user: this.userService.getPublicDetails(userModel),
                student: this.service.getPublicDetails(studentModel)
            });
        }
    };
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "findAll", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Delete('/:id'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "deleteResource", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('get-student-details'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "getTeacherDetails", null);
    __decorate([
        common_1.Put(':id/update-profile'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "updateStudentProfile", null);
    __decorate([
        common_1.Put(':id/update-profile-pic'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
            storage: multer_1.diskStorage({
                destination: './avatars',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, `${randomName}${path_1.extname(file.originalname)}`);
                }
            })
        })),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "updateStudentProfilePic", null);
    __decorate([
        common_1.Put(':id/update-profile-pic-base64'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
            storage: multer_1.diskStorage({
                destination: './avatars',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, `${randomName}${path_1.extname(file.originalname)}`);
                }
            })
        })),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "updateStudentProfilePicBase64", null);
    StudentsController = __decorate([
        common_1.Controller('students'),
        __metadata("design:paramtypes", [students_service_1.StudentsService,
            users_service_1.UsersService,
            config_1.ConfigService])
    ], StudentsController);
    return StudentsController;
})();
exports.StudentsController = StudentsController;
//# sourceMappingURL=students.controller.js.map