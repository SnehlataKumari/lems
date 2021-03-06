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
exports.LiveClassService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("./db.service");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const teachers_service_1 = require("./teachers.service");
let LiveClassService = (() => {
    let LiveClassService = class LiveClassService extends db_service_1.DBService {
        constructor(model, teacherService) {
            super(model);
            this.teacherService = teacherService;
        }
        findAll() {
            return super.findAll().populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
        }
        async createLiveClass(body, userId) {
            const teacher = await this.teacherService.findOne({ userId: userId });
            const teacherId = teacher._id;
            return this.create(Object.assign(Object.assign({}, body), { teacher: teacherId, user: userId }));
        }
        async createLiveClassByAdmin(body) {
            try {
                const response = await this.create(Object.assign(Object.assign({}, body), { hasAcceptedRequest: true, isCreatedByAdmin: true }));
            }
            catch (error) {
                console.log(error);
            }
        }
        async getLiveClassByTeacherId(userId) {
            const teacher = await this.teacherService.findOne({ userId: userId });
            const teacherId = teacher._id;
            const liveClassesList = await this.find({
                teacher: teacherId,
            }).sort('-_id');
            return liveClassesList;
        }
        async getAllLiveClasses() {
            const liveClassesList = await this.findAll().populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
            console.log(liveClassesList.length);
            return liveClassesList;
        }
        async getLiveClassCreatedByTeacher() {
            const liveClassesList = await this.find({ isCreatedByAdmin: false }).populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
            return liveClassesList;
        }
        async getLiveClassCreatedByAdmin() {
            const liveClassesList = await this.find({ isCreatedByAdmin: true }).populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
            return liveClassesList;
        }
        async getLiveDemoClasses() {
            const liveDemoClassesList = await this.find({ isDemoClass: true }).populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
            return liveDemoClassesList;
        }
        async deleteLiveClassById(liveClassId) {
            const liveClassModel = await this.findById(liveClassId);
            liveClassModel.remove();
            return true;
        }
    };
    LiveClassService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_2.InjectModel('LiveClass')),
        __metadata("design:paramtypes", [mongoose_1.Model,
            teachers_service_1.TeachersService])
    ], LiveClassService);
    return LiveClassService;
})();
exports.LiveClassService = LiveClassService;
//# sourceMappingURL=liveClass.service.js.map