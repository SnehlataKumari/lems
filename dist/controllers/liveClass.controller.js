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
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
const liveClass_service_1 = require("../services/liveClass.service");
const utils_1 = require("../utils");
const resource_controller_1 = require("./resource.controller");
const lodash_1 = require("lodash");
const moment = require("moment");
const agora_access_token_1 = require("agora-access-token");
let LiveClassController = (() => {
    let LiveClassController = class LiveClassController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
            this.service = service;
        }
        async getLiveClassCreatedByTeacher() {
            return utils_1.success('List Found successfully', await this.service.getLiveClassCreatedByTeacher());
        }
        async getAllLiveClasses() {
            const classesList = await this.service.getAllLiveClasses();
            const groupedClasses = lodash_1.groupBy(classesList, (classs) => {
                if (moment(classs.date).isSame(moment(), 'day')) {
                    return 'TODAY';
                }
                else if (moment(classs.date).isBefore()) {
                    return 'PAST';
                }
                else if (moment(classs.date).isAfter()) {
                    return 'FUTURE';
                }
                return 'DEFAULT';
            });
            return utils_1.success('Live classes list found successfully!', {
                classesList,
                groupedClasses
            });
        }
        async getLiveClassCreatedByAdmin() {
            return utils_1.success('List Found successfully', await this.service.getLiveClassCreatedByAdmin());
        }
        async getLiveDemoClasses() {
            return utils_1.success('List Found successfully', await this.service.getLiveDemoClasses());
        }
        async deleteLiveClassById(liveClassId) {
            await this.service.deleteLiveClassById(liveClassId);
            return utils_1.success('Live Class deleted successfully', {});
        }
        async createLiveClass(request) {
            const body = request.body;
            const userId = request.user._id;
            return utils_1.success('Live class added!', await this.service.createLiveClass(body, userId));
        }
        ;
        async createLiveClassByAdmin(request) {
            const body = request.body;
            console.log(body);
            return utils_1.success('Live class added!', await this.service.createLiveClassByAdmin(body));
        }
        ;
        async validateStreamCode({ streamCode }) {
            const liveClass = await this.service.findOne({ streamCode: streamCode });
            if (liveClass === null) {
                return true;
            }
            return false;
        }
        async getAllLiveClassesByTeacherId(request) {
            const userId = request.user._id;
            const classesList = await this.service.getLiveClassByTeacherId(userId);
            const groupedClasses = lodash_1.groupBy(classesList, (classs) => {
                if (moment(classs.date).isSame(moment(), 'day')) {
                    return 'TODAY';
                }
                else if (moment(classs.date).isBefore()) {
                    return 'PAST';
                }
                else if (moment(classs.date).isAfter()) {
                    return 'FUTURE';
                }
                return 'DEFAULT';
            });
            return utils_1.success('Live classes list found successfully!', {
                classesList,
                groupedClasses
            });
        }
        async acceptLiveClasssRequest(id) {
            const liveClassModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRequest: true });
            return utils_1.success('Live class request accepted successfully', liveClassModel);
        }
        async rejectLiveClassRequest(id, rejectionReason) {
            console.log(id, rejectionReason);
            const liveClassModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRequest: false, rejectionReason: rejectionReason.rejectionReason });
            return utils_1.success('Live class request rejected!', liveClassModel);
        }
        async getLiveClassAttendDetail(id) {
            const liveClass = await this.service.findById(id);
            const appID = '0963340bf9fb45ca84026e1da0a4287f';
            const channelName = 'liveClass._id';
            const appCertificate = 'afd9e56a27074913a64a1864f3c16087';
            const uid = 0;
            const role = agora_access_token_1.RtcRole.SUBSCRIBER;
            const expirationTimeInSeconds = 3600;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
            const tokenA = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
            const agoraLiveClassConfig = {
                appID,
                channelName,
                uid,
                role,
                tokenA
            };
            return utils_1.success('Resource updated successfully!', Object.assign(Object.assign({}, liveClass.toJSON()), { agoraLiveClassConfig }));
        }
        async getResource(id) {
            const liveClass = await this.service.findById(id);
            const appID = '0963340bf9fb45ca84026e1da0a4287f';
            const channelName = 'liveClass._id';
            const appCertificate = 'afd9e56a27074913a64a1864f3c16087';
            const uid = 0;
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
                tokenA
            };
            return utils_1.success('Resource updated successfully!', Object.assign(Object.assign({}, liveClass.toJSON()), { agoraLiveClassConfig }));
        }
    };
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getLiveClassCreatedByTeacher", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('all-live-classes'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getAllLiveClasses", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('by-admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getLiveClassCreatedByAdmin", null);
    __decorate([
        common_1.Get('demo-classes'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getLiveDemoClasses", null);
    __decorate([
        common_1.Delete(':liveClassId'),
        __param(0, common_1.Param('liveClassId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "deleteLiveClassById", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post(),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "createLiveClass", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post('/by-admin'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "createLiveClassByAdmin", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post('/validate-stream-code'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "validateStreamCode", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('/get-teachers-live-class'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getAllLiveClassesByTeacherId", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Put('/:liveClassId/accept-live-Class-request'),
        __param(0, common_1.Param('liveClassId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "acceptLiveClasssRequest", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Put('/:liveClassId/reject-live-Class-request'),
        __param(0, common_1.Param('liveClassId')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "rejectLiveClassRequest", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('/:id/attendClass'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getLiveClassAttendDetail", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Get('/:id'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LiveClassController.prototype, "getResource", null);
    LiveClassController = __decorate([
        common_1.Controller('live-class'),
        __metadata("design:paramtypes", [liveClass_service_1.LiveClassService])
    ], LiveClassController);
    return LiveClassController;
})();
exports.LiveClassController = LiveClassController;
//# sourceMappingURL=liveClass.controller.js.map