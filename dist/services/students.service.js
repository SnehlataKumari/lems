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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("./db.service");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("./users.service");
let StudentsService = (() => {
    let StudentsService = class StudentsService extends db_service_1.DBService {
        constructor(model, userService) {
            super(model);
            this.userService = userService;
        }
        async deleteTeacherById(teacherId) {
            const teacherModel = await this.findById(teacherId).populate('userId');
            const userModel = teacherModel.userId;
            teacherModel.remove();
            userModel.remove();
            return true;
        }
        async hasAcceptedRegistrationRequest(requestBody, teacherId) {
            const teacherModel = await this.findById(teacherId);
            if (teacherModel) {
                if (requestBody.accept === true) {
                    await this.update(teacherModel, { hasAcceptedRegistrationRequest: requestBody.accept });
                    return { message: 'Registration form accepted.' };
                }
            }
        }
        findAll(where = {}) {
            return super.findAll(where).populate('userId').sort('-_id');
        }
        findById(id) {
            return super.findById(id).populate('userId');
        }
        async findByToken(token) {
            const teacher = await this.findOne(token);
            return teacher;
        }
        async editTeacherProfile(requestBody, loggedInUser) {
            const teacher = await this.findOne({
                userId: loggedInUser._id
            });
            const user = await this.userService.findById(teacher.userId);
            await this.userService.update(user, requestBody.user);
            return await this.update(teacher, requestBody.teacher);
        }
        async updateProfile(teacherId, requestBody) {
            const teacher = await this.findById(teacherId);
            if (!teacher) {
                throw new common_1.UnauthorizedException('user not found!');
            }
            const userId = teacher.userId;
            const userModel = await this.userService.update(userId, requestBody.user);
            const teacherModel = await this.update(teacherId, requestBody.teacher);
            return {
                user: userModel,
                teacher: teacherModel
            };
        }
    };
    StudentsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_2.InjectModel('Student')),
        __metadata("design:paramtypes", [mongoose_1.Model,
            users_service_1.UsersService])
    ], StudentsService);
    return StudentsService;
})();
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map