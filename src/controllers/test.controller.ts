import { ResourceController } from './resource.controller';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TestService } from 'src/services/test.service';
import { success } from 'src/utils';

@Controller('tests')
export class TestController extends ResourceController {
  constructor(
    service: TestService,
  ) {
    super(service);
  }

  @Get(':testId')
  async getTestById(@Param('testId') testId ) {
    const testModel = await this.service.findById(testId);
    return success('Test found!', this.service.getPublicDetails(testModel));
  }
}