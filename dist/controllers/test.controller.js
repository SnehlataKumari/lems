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
let TestController = (() => {
    let TestController = class TestController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
        }
        async getTestById(testId) {
            const testModel = await this.service.findById(testId);
            return utils_1.success('Test found!', this.service.getPublicDetails(testModel));
        }
    };
    __decorate([
        common_1.Get(':testId'),
        __param(0, common_1.Param('testId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TestController.prototype, "getTestById", null);
    TestController = __decorate([
        common_1.Controller('tests'),
        __metadata("design:paramtypes", [test_service_1.TestService])
    ], TestController);
    return TestController;
})();
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map