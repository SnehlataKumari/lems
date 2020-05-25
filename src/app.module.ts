import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import schemas from './schemas';
import services from './services';
import controllers from './controllers';
import { OTPStrategy } from './passport/otp.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://localhost/${process.env.DATABASE_NAME}`),
    MongooseModule.forFeature(schemas),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    JwtModule.register({
      secret: JWT_CONSTANTS.secret
    }),
    
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, OTPStrategy, ...services],
})
export class AppModule {}
