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
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const classes_service_1 = require("../services/classes.service");
const chapters_service_1 = require("../services/chapters.service");
const auth_guard_1 = require("../passport/auth.guard");
const assets_service_1 = require("../services/assets.service");
const utils_1 = require("../utils");
const subject_service_1 = require("../services/subject.service");
let ClassesController = (() => {
    let ClassesController = class ClassesController extends resource_controller_1.ResourceController {
        constructor(service, chapterService, assetService, subjectService) {
            super(service);
            this.chapterService = chapterService;
            this.assetService = assetService;
            this.subjectService = subjectService;
        }
        async getAllChapters(classId, queries) {
            let where = { class: classId };
            if (queries && queries.search) {
                where = Object.assign(Object.assign({}, where), { $text: { $search: queries.search } });
            }
            console.log(where);
            return this.chapterService.find(where).populate('class')
                .populate('assets');
        }
        async getAllAssets(id) {
            return utils_1.success('Success!', this.assetService.find({
                class: id
            }));
        }
        async getAllSubjects(id) {
            return utils_1.success('Success!', this.subjectService.find());
        }
    };
    __decorate([
        common_1.Get('/:id/chapters'),
        __param(0, common_1.Param('id')), __param(1, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ClassesController.prototype, "getAllChapters", null);
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Get('/:id/assets'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ClassesController.prototype, "getAllAssets", null);
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Get('/:id/subjects'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ClassesController.prototype, "getAllSubjects", null);
    ClassesController = __decorate([
        common_1.Controller('classes'),
        __metadata("design:paramtypes", [classes_service_1.ClassesService,
            chapters_service_1.ChaptersService,
            assets_service_1.AssetsService,
            subject_service_1.SubjectsService])
    ], ClassesController);
    return ClassesController;
})();
exports.ClassesController = ClassesController;
//# sourceMappingURL=classes.controller.js.map