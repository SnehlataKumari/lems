"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongo_exception_filter_1 = require("./exception-filters/mongo-exception.filter");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalFilters(new mongo_exception_filter_1.MongooseExceptionFilter());
    app.useGlobalFilters(new mongo_exception_filter_1.MongoDBExceptionFilter());
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map