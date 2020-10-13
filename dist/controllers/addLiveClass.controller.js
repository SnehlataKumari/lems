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
exports.LiveClassController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../services/auth.service");
const tokens_service_1 = require("../services/tokens.service");
const resource_controller_1 = require("./resource.controller");
let LiveClassController = (() => {
    let LiveClassController = class LiveClassController extends resource_controller_1.ResourceController {
        constructor(config, tokenService, service) {
            super(service);
            this.config = config;
            this.tokenService = tokenService;
            this.service = service;
        }
        get hostUrl() {
            return this.config.get('HOST_URL');
        }
        async addLiveClass(requestBody) {
            console.log(requestBody);
        }
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "addLiveClass", null);
    LiveClassController = __decorate([
        common_1.Controller('liveClass'),
        __metadata("design:paramtypes", [config_1.ConfigService,
            tokens_service_1.TokensService,
            auth_service_1.AuthService])
    ], LiveClassController);
    return LiveClassController;
})();
exports.LiveClassController = LiveClassController;
//# sourceMappingURL=addLiveClass.controller.js.map