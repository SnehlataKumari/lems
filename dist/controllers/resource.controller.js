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
exports.ResourceController = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const jwttokenauth_guard_1 = require("../passport/jwttokenauth.guard");
let ResourceController = (() => {
    class ResourceController {
        constructor(service) {
            this.service = service;
        }
        findAll() {
            return utils_1.success('List found successfully', this.service.findAll());
        }
        createResource(createObject) {
            return utils_1.success('Resource created successfully!', this.service.create(createObject));
        }
        async deleteResource(id) {
            await this.service.findByIdAndDelete(id);
            return utils_1.success('Resource deleted successfully!', {
                id,
            });
        }
        async updateResource(id, resourceObject) {
            return utils_1.success('Resource updated successfully!', this.service.findByIdAndUpdate(id, resourceObject));
        }
    }
    __decorate([
        common_1.UseGuards(jwttokenauth_guard_1.JwtTokenAuthGuard),
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ResourceController.prototype, "findAll", null);
    __decorate([
        common_1.UseGuards(jwttokenauth_guard_1.JwtTokenAuthGuard),
        common_1.Post(),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ResourceController.prototype, "createResource", null);
    __decorate([
        common_1.UseGuards(jwttokenauth_guard_1.JwtTokenAuthGuard),
        common_1.Delete('/:id'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ResourceController.prototype, "deleteResource", null);
    __decorate([
        common_1.UseGuards(jwttokenauth_guard_1.JwtTokenAuthGuard),
        common_1.Put('/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ResourceController.prototype, "updateResource", null);
    return ResourceController;
})();
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map