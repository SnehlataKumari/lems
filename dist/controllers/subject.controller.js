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
exports.SubjectsController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const subject_service_1 = require("../services/subject.service");
const auth_guard_1 = require("../passport/auth.guard");
const utils_1 = require("../utils");
const assets_service_1 = require("../services/assets.service");
const chapters_service_1 = require("../services/chapters.service");
let SubjectsController = (() => {
    let SubjectsController = class SubjectsController extends resource_controller_1.ResourceController {
        constructor(service, assetService, chaptersService) {
            super(service);
            this.assetService = assetService;
            this.chaptersService = chaptersService;
        }
        async getAllAssets(id, req) {
            const assetsList = await this.assetService.find({
                subject: id,
            });
            const assetsListWithisSubscribed = await this.assetService.withIsSubscribedKey(assetsList, req.user);
            return utils_1.success('Success!', assetsListWithisSubscribed);
        }
        async getAllChapters(id) {
            return utils_1.success('Success!', this.chaptersService.find({
                subject: id,
            }));
        }
    };
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Get('/:id/assets'),
        __param(0, common_1.Param('id')), __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], SubjectsController.prototype, "getAllAssets", null);
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Get('/:id/chapters'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], SubjectsController.prototype, "getAllChapters", null);
    SubjectsController = __decorate([
        common_1.Controller('subjects'),
        __metadata("design:paramtypes", [subject_service_1.SubjectsService,
            assets_service_1.AssetsService,
            chapters_service_1.ChaptersService])
    ], SubjectsController);
    return SubjectsController;
})();
exports.SubjectsController = SubjectsController;
//# sourceMappingURL=subject.controller.js.map