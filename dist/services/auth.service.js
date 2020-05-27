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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const users_service_1 = require("./users.service");
let AuthService = (() => {
    let AuthService = class AuthService {
        constructor(userService) {
            this.userService = userService;
        }
        async requestOTP(user) {
            user.otp = utils_1.generateOTP();
            user.save();
            return user;
        }
        async validateUser(mobileNumber, otp) {
            const user = await this.userService.findByMobileNumber(mobileNumber);
            if (user && user.otp === otp) {
                return user;
            }
            throw new common_1.UnauthorizedException();
        }
        async clearOTP(user) {
            return this.userService.update(user, {
                otp: ''
            });
        }
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map