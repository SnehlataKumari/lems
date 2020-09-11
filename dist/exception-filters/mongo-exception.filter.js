"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBExceptionFilter = exports.MongooseExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
let MongooseExceptionFilter = (() => {
    let MongooseExceptionFilter = class MongooseExceptionFilter {
        catch(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const status = 401;
            const excE = exception;
            const errors = excE.errors;
            const errorMessage = {};
            for (const errorField in errors) {
                if (errors.hasOwnProperty(errorField)) {
                    const errorObject = errors[errorField];
                    errorMessage[errorField] = errorObject.message;
                }
            }
            let errorMessageStr = 'Please provide valid input';
            if (errorMessage && Reflect.ownKeys(errorMessage).length) {
                errorMessageStr = Object.values(errorMessage)[0];
            }
            response.status(status).json({
                statusCode: status,
                message: errorMessageStr,
                error: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    };
    MongooseExceptionFilter = __decorate([
        common_1.Catch(mongoose_1.Error)
    ], MongooseExceptionFilter);
    return MongooseExceptionFilter;
})();
exports.MongooseExceptionFilter = MongooseExceptionFilter;
let MongoDBExceptionFilter = (() => {
    let MongoDBExceptionFilter = class MongoDBExceptionFilter {
        catch(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const status = 401;
            console.log(exception);
            let errorMessage = 'Please provide valid input';
            const error = exception;
            if (exception.code === 11000) {
                errorMessage = `Duplicate value for field ${String(Reflect.ownKeys(error.keyValue)[0])}.`;
                if (String(Reflect.ownKeys(error.keyValue)[0]) === 'email') {
                    errorMessage = ' Entered email already exists. Please try another one';
                }
            }
            response.status(status).json({
                statusCode: status,
                message: errorMessage,
                error: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    };
    MongoDBExceptionFilter = __decorate([
        common_1.Catch(mongodb_1.MongoError)
    ], MongoDBExceptionFilter);
    return MongoDBExceptionFilter;
})();
exports.MongoDBExceptionFilter = MongoDBExceptionFilter;
//# sourceMappingURL=mongo-exception.filter.js.map