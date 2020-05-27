"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongo_exception_filter_1 = require("./exception-filters/mongo-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalFilters(new mongo_exception_filter_1.MongooseExceptionFilter());
    app.useGlobalFilters(new mongo_exception_filter_1.MongoDBExceptionFilter());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map