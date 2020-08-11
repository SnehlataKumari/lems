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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("../services/tokens.service");
const resource_controller_1 = require("./resource.controller");
const utils_1 = require("../utils");
let TokensController = (() => {
    let TokensController = class TokensController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
        }
        findAll() {
            return utils_1.success('List found successfully', this.service.findAll());
        }
    };
    __decorate([
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TokensController.prototype, "findAll", null);
    TokensController = __decorate([
        common_1.Controller('token'),
        __metadata("design:paramtypes", [tokens_service_1.TokensService])
    ], TokensController);
    return TokensController;
})();
exports.TokensController = TokensController;
//# sourceMappingURL=token.controller.js.map