import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MongooseExceptionFilter,
  MongoDBExceptionFilter,
} from './exception-filters/mongo-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalFilters(new MongooseExceptionFilter());
  app.useGlobalFilters(new MongoDBExceptionFilter());
  
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT);
}
bootstrap();
