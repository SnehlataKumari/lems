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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const auth_service_1 = require("../services/auth.service");
let JwtStrategy = (() => {
    let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
        constructor(authService) {
            super({
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: constants_1.JWT_CONSTANTS.secret,
                passReqToCallback: true,
            });
            this.authService = authService;
        }
        async validate(request, payload) {
            const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(request);
            const isValidToken = await this.authService.isValidAuthToken(token);
            if (!isValidToken) {
                throw new common_1.UnauthorizedException('Token not found!');
            }
            return await this.authService.getUserById(payload._id);
        }
    };
    JwtStrategy = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], JwtStrategy);
    return JwtStrategy;
})();
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map