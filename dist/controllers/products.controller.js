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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const utils_1 = require("../utils");
const products_service_1 = require("../services/products.service");
const validatetoken_decorator_1 = require("../decorators/validatetoken.decorator");
let ProductsController = (() => {
    let ProductsController = class ProductsController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
        }
        findAll() {
            return utils_1.success('List found successfully', this.service.findAll());
        }
        async getTestById(testId) {
            const productModel = await this.service.findById(testId);
            return utils_1.success('Product found!', this.service.getPublicDetails(productModel));
        }
        async createProduct(request) {
            const body = request.body;
            const userId = request.user._id;
            return utils_1.success('Product Created Successfully', await this.service.createProduct(body, userId));
        }
        ;
        async validateStreamCode({ productCode }) {
            const product = await this.service.findOne({ productCode: productCode });
            if (product === null) {
                return true;
            }
            return false;
        }
        async addCourse(requestBody) {
            const course = await this.service.addCourse(requestBody);
            return utils_1.success(' course added successfully', { course });
        }
        async liveStreamDetails(requestBody) {
            const liveStream = await this.service.liveStream(requestBody);
            return utils_1.success('live stream details', { liveStream });
        }
    };
    __decorate([
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findAll", null);
    __decorate([
        common_1.Get(':productId'),
        __param(0, common_1.Param('productId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ProductsController.prototype, "getTestById", null);
    __decorate([
        validatetoken_decorator_1.ValidateToken(),
        common_1.Post(),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ProductsController.prototype, "createProduct", null);
    __decorate([
        common_1.Post('/validate-product-code'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ProductsController.prototype, "validateStreamCode", null);
    __decorate([
        common_1.Post('add-course'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ProductsController.prototype, "addCourse", null);
    __decorate([
        common_1.Post('add-live-stream-details'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ProductsController.prototype, "liveStreamDetails", null);
    ProductsController = __decorate([
        common_1.Controller('products'),
        __metadata("design:paramtypes", [products_service_1.ProductsService])
    ], ProductsController);
    return ProductsController;
})();
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map