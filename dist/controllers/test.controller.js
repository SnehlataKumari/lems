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
exports.TestController = void 0;
const resource_controller_1 = require("./resource.controller");
const common_1 = require("@nestjs/common");
const test_service_1 = require("../services/test.service");
const utils_1 = require("../utils");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const teachers_service_1 = require("../services/teachers.service");
let TestController = (() => {
    let TestController = class TestController extends resource_controller_1.ResourceController {
        constructor(service, teacherService) {
            super(service);
            this.teacherService = teacherService;
        }
        async createTest(createObject, req) {
            const teacherModel = await this.teacherService.findOne({
                userId: req.user._id
            });
            let createTestObj = Object.assign({}, createObject);
            if (req.user.role !== 'ADMIN') {
                createTestObj = Object.assign(Object.assign({}, createObject), { user: req.user._id, teacher: teacherModel._id });
            }
            return utils_1.success('Test created successfully!', this.service.create(createTestObj));
        }
        findAllTests(req) {
            const { user } = req;
            let where = {};
            if (user.role !== 'ADMIN') {
                where = {
                    user: user._id
                };
            }
            return utils_1.success('List found successfully', this.service.findAll(where));
        }
        async getTestById(testId) {
            const testModel = await this.service.findById(testId);
            return utils_1.success('Test found!', this.service.getPublicDetails(testModel));
        }
    };
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post(),
        __param(0, common_1.Body()), __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TestController.prototype, "createTest", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get(),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "findAllTests", null);
    __decorate([
        common_1.Get(':testId'),
        __param(0, common_1.Param('testId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TestController.prototype, "getTestById", null);
    TestController = __decorate([
        common_1.Controller('tests'),
        __metadata("design:paramtypes", [test_service_1.TestService,
            teachers_service_1.TeachersService])
    ], TestController);
    return TestController;
})();
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map