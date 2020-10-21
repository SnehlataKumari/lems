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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const db_service_1 = require("./db.service");
const courses_service_1 = require("./courses.service");
const liveStreams_service_1 = require("./liveStreams.service");
const utils_1 = require("../utils");
let ProductsService = (() => {
    let ProductsService = class ProductsService extends db_service_1.DBService {
        constructor(model, coursesService, liveStreamsService) {
            super(model);
            this.coursesService = coursesService;
            this.liveStreamsService = liveStreamsService;
        }
        findAll() {
            return super.findAll().populate('productImageId').populate('user').sort('-_id');
        }
        async createProduct(body, userId) {
            return this.create(Object.assign(Object.assign({}, body), { user: userId }));
        }
        async addCourse(requestBody) {
            return await this.coursesService.create(requestBody);
        }
        async liveStream(requestBody) {
            return await this.liveStreamsService.create(requestBody);
        }
    };
    ProductsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_2.InjectModel('Product')),
        __metadata("design:paramtypes", [mongoose_1.Model,
            courses_service_1.CoursesService,
            liveStreams_service_1.LiveStreamsService])
    ], ProductsService);
    return ProductsService;
})();
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map