import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { privacy } from './privacy-policy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('privacy-policy')
  sendPrivacyPolicy(): string {
    return privacy;
  }
}
