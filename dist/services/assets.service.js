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
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const db_service_1 = require("./db.service");
const file_service_1 = require("./file.service");
const version_service_1 = require("./version.service");
let AssetsService = (() => {
    let AssetsService = class AssetsService extends db_service_1.DBService {
        constructor(model, fileService, versionService) {
            super(model);
            this.fileService = fileService;
            this.versionService = versionService;
        }
        async saveFile(file) {
            return this.fileService.saveFile(file);
        }
        async withIsSubscribedKey(assetsList, user) {
            const { version } = await this.versionService.findOne({});
            return assetsList.map(a => (Object.assign(Object.assign({}, a.toJSON()), { isSubscribed: user.isSubscribed, version })));
        }
    };
    AssetsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_2.InjectModel('Asset')),
        __metadata("design:paramtypes", [mongoose_1.Model,
            file_service_1.FileService,
            version_service_1.VersionService])
    ], AssetsService);
    return AssetsService;
})();
exports.AssetsService = AssetsService;
//# sourceMappingURL=assets.service.js.map