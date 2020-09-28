import { Controller, Body, Post, Put, Param, Get, Req, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ImportService } from 'src/services/import.service';

@Controller('import')
export class ImportController {
  constructor(private service: ImportService) { }
  
  @Post('questions')
  async importQuestions(@Body() requestBody) {
    return this.service.importQuestions(requestBody);
  }
}