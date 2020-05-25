import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter, MongoDBExceptionFilter } from './exception-filters/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new MongooseExceptionFilter());
  app.useGlobalFilters(new MongoDBExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
