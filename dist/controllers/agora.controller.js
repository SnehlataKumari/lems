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
exports.AgoraComponent = void 0;
const common_1 = require("@nestjs/common");
const agora_access_token_1 = require("agora-access-token");
const utils_1 = require("../utils");
let AgoraComponent = (() => {
    let AgoraComponent = class AgoraComponent {
        getAgoraToken(userId) {
            const appID = '0963340bf9fb45ca84026e1da0a4287f';
            const channelName = 'liveClass._id';
            const appCertificate = 'afd9e56a27074913a64a1864f3c16087';
            const uid = userId || 0;
            const role = agora_access_token_1.RtcRole.PUBLISHER;
            const expirationTimeInSeconds = 3600;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
            const tokenA = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
            const agoraLiveClassConfig = {
                appID,
                channelName,
                uid,
                role,
                tokenA,
            };
            return utils_1.success('Token generated', agoraLiveClassConfig);
        }
    };
    __decorate([
        common_1.Get('get-token/:userId'),
        __param(0, common_1.Param('userId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AgoraComponent.prototype, "getAgoraToken", null);
    AgoraComponent = __decorate([
        common_1.Controller('agora')
    ], AgoraComponent);
    return AgoraComponent;
})();
exports.AgoraComponent = AgoraComponent;
//# sourceMappingURL=agora.controller.js.map