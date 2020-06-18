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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const resource_controller_1 = require("./resource.controller");
const utils_1 = require("../utils");
const auth_guard_1 = require("../passport/auth.guard");
let PaymentsController = (() => {
    let PaymentsController = class PaymentsController extends resource_controller_1.ResourceController {
        constructor(service) {
            super(service);
        }
        async createPayment(req) {
            const { user, body } = req;
            user.payments.push(Object.assign({}, body));
            user.isSubscribed = true;
            await user.save();
            return utils_1.success('Payment recorded successfully', user);
        }
    };
    __decorate([
        common_1.UseGuards(auth_guard_1.JwtAuthGuard),
        common_1.Post('on-payment-successfull'),
        __param(0, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PaymentsController.prototype, "createPayment", null);
    PaymentsController = __decorate([
        common_1.Controller('payments'),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], PaymentsController);
    return PaymentsController;
})();
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map