"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const schemas_1 = require("./schemas");
const services_1 = require("./services");
const controllers_1 = require("./controllers");
const otp_strategy_1 = require("./passport/otp.strategy");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./passport/jwt.strategy");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: path_1.join(__dirname, '..', 'static/uploads'),
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let AppModule = (() => {
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                mongoose_1.MongooseModule.forRoot(`mongodb://localhost/${process.env.DATABASE_NAME}`),
                mongoose_1.MongooseModule.forFeature(schemas_1.default),
                jwt_1.JwtModule.register({
                    secret: constants_1.JWT_CONSTANTS.secret,
                }),
            ],
            controllers: [app_controller_1.AppController, ...controllers_1.default],
            providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy, otp_strategy_1.OTPStrategy, ...services_1.default],
        })
    ], AppModule);
    return AppModule;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map