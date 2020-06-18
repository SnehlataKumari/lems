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
exports.ChaptersController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const chapters_service_1 = require("../services/chapters.service");
const assets_service_1 = require("../services/assets.service");
const auth_guard_1 = require("../passport/auth.guard");
const utils_1 = require("../utils");
let ChaptersController = (() => {
    let ChaptersController = class ChaptersController extends resource_controller_1.ResourceController {
        constructor(service, assetService) {
            super(service);
            this.assetService = assetService;
        }
        async getAllAssets(id, req) {
            const assetsList = await this.assetService.find({
                chapter: id
            });
            const assetsListWithisSubscribed = await this.assetService.withIsSubscribedKey(assetsList, req.user);
            return utils_1.success('Success!', assetsListWithisSubscribed);
        }
        findAllChapters(query) {
            return utils_1.success('List found successfully', this.service.findAll(query));
        }
    };
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Get('/:id/assets'),
        __param(0, common_1.Param('id')), __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ChaptersController.prototype, "getAllAssets", null);
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Get(),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ChaptersController.prototype, "findAllChapters", null);
    ChaptersController = __decorate([
        common_1.Controller('chapters'),
        __metadata("design:paramtypes", [chapters_service_1.ChaptersService,
            assets_service_1.AssetsService])
    ], ChaptersController);
    return ChaptersController;
})();
exports.ChaptersController = ChaptersController;
//# sourceMappingURL=chapters.controller.js.map