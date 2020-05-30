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
let ClassesController = (() => {
    let ClassesController = class ClassesController extends resource_controller_1.ResourceController {
        constructor(service, chapterService) {
            super(service);
            this.chapterService = chapterService;
        }
        async getAllChapters(classId) {
            return this.chapterService.find({
                class: classId
            }).populate('class').populate('assets');
        }
    };
    __decorate([
        common_1.Get('/:id/chapters'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ClassesController.prototype, "getAllChapters", null);
    ClassesController = __decorate([
        common_1.Controller('classes'),
        __metadata("design:paramtypes", [classes_service_1.ClassesService,
            chapters_service_1.ChaptersService])
    ], ClassesController);
    return ClassesController;
})();
exports.ClassesController = ClassesController;
//# sourceMappingURL=classes.controller.js.map