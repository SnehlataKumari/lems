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
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const videos_service_1 = require("../services/videos.service");
const utils_1 = require("../utils");
const platform_express_1 = require("@nestjs/platform-express");
let VideosController = (() => {
    let VideosController = class VideosController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
        }
        async createVideo(createObject, file) {
            const { response } = await this.service.saveFile(file);
            return utils_1.success('Resource created successfully!', this.service.create(Object.assign(Object.assign({}, createObject), { s3: response })));
        }
        async updateVideo(id, createObject, file) {
            const updateObject = Object.assign({}, createObject);
            if (file) {
                const { response } = await this.service.saveFile(file);
                updateObject.s3 = response;
            }
            return utils_1.success('Resource updated successfully!', this.service.findByIdAndUpdate(id, updateObject));
        }
    };
    __decorate([
        common_1.Post(),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
        __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], VideosController.prototype, "createVideo", null);
    __decorate([
        common_1.Put('/:id'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.UploadedFile()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], VideosController.prototype, "updateVideo", null);
    VideosController = __decorate([
        common_1.Controller('videos'),
        __metadata("design:paramtypes", [videos_service_1.VideosService])
    ], VideosController);
    return VideosController;
})();
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map