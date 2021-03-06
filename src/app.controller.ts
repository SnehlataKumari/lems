import { Controller, Get, Param, Res } from '@nestjs/common';
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

  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
