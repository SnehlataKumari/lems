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
exports.LeaveController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const leave_service_1 = require("../services/leave.service");
const teachers_service_1 = require("../services/teachers.service");
const route_params_decorator_1 = require("@nestjs/common/decorators/http/route-params.decorator");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
const route_params_decorator_2 = require("@nestjs/common/decorators/http/route-params.decorator");
const utils_1 = require("../utils");
let LeaveController = (() => {
    let LeaveController = class LeaveController extends resource_controller_1.ResourceController {
        constructor(service, teacherService) {
            super(service);
            this.teacherService = teacherService;
        }
        async createLeave(createObject, req) {
            const teacherModel = await this.teacherService.findOne({
                userId: req.user._id
            });
            let createLeaveObj = Object.assign({}, createObject);
            if (req.user.role !== 'ADMIN') {
                createLeaveObj = Object.assign(Object.assign({}, createObject), { user: req.user._id, teacher: teacherModel._id });
            }
            return utils_1.success('Test created successfully!', this.service.create(createLeaveObj));
        }
    };
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        request_mapping_decorator_1.Post(),
        __param(0, route_params_decorator_1.Body()), __param(1, route_params_decorator_2.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LeaveController.prototype, "createLeave", null);
    LeaveController = __decorate([
        common_1.Controller('leave'),
        __metadata("design:paramtypes", [leave_service_1.LeaveService,
            teachers_service_1.TeachersService])
    ], LeaveController);
    return LeaveController;
})();
exports.LeaveController = LeaveController;
//# sourceMappingURL=leave.controller.js.map