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
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const assets_service_1 = require("../services/assets.service");
const utils_1 = require("../utils");
const jwttokenauth_guard_1 = require("../passport/jwttokenauth.guard");
let AssetsController = (() => {
    let AssetsController = class AssetsController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
        }
        async findAllAssets(req) {
            const assetsList = await this.service.findAll();
            const assetsListWithisSubscribed = await this.service.withIsSubscribedKey(assetsList, req.user);
            return utils_1.success('List found successfully', assetsListWithisSubscribed);
        }
        async createAsset(createObject) {
            return utils_1.success('Asset created successfully!', this.service.create(Object.assign({}, createObject)));
        }
        async updateAsset(id, updateObject) {
            const updatedObject = Object.assign({}, updateObject);
            return utils_1.success('Asset updated successfully!', this.service.findByIdAndUpdate(id, updatedObject));
        }
        async uploadAssetsTos3(files) {
            let videoS3, pdfS3;
            const { video, pdf } = files;
            if (video && video[0]) {
                videoS3 = (await this.service.saveFile(video[0])).response;
            }
            if (pdf && pdf[0]) {
                pdfS3 = (await this.service.saveFile(pdf[0])).response;
            }
            return {
                videoS3,
                pdfS3,
            };
        }
    };
    __decorate([
        common_1.UseGuards(jwttokenauth_guard_1.JwtTokenAuthGuard),
        common_1.Get(),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AssetsController.prototype, "findAllAssets", null);
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AssetsController.prototype, "createAsset", null);
    __decorate([
        common_1.Put(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AssetsController.prototype, "updateAsset", null);
    AssetsController = __decorate([
        common_1.Controller('assets'),
        __metadata("design:paramtypes", [assets_service_1.AssetsService])
    ], AssetsController);
    return AssetsController;
})();
exports.AssetsController = AssetsController;
//# sourceMappingURL=assets.controller.js.map