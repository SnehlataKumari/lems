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
let StudentsController = (() => {
    let StudentsController = class StudentsController extends resource_controller_1.ResourceController {
        constructor(service, userService) {
            super(service);
            this.userService = userService;
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
    };
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('get-student-details'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], StudentsController.prototype, "getTeacherDetails", null);
    StudentsController = __decorate([
        common_1.Controller('students'),
        __metadata("design:paramtypes", [students_service_1.StudentsService,
            users_service_1.UsersService])
    ], StudentsController);
    return StudentsController;
})();
exports.StudentsController = StudentsController;
//# sourceMappingURL=students.controller.js.map