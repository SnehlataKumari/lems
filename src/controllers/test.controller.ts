import { ResourceController } from './resource.controller';
import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { TestService } from 'src/services/test.service';
import { success } from 'src/utils';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { TeachersService } from 'src/services/teachers.service';

@Controller('tests')
export class TestController extends ResourceController {
  constructor(
    service: TestService,
    private teacherService: TeachersService
  ) {
    super(service);
  }

  @ValidateToken()
  @Post()
  async createTest(@Body() createObject, @Req() req) {
    const teacherModel = await this.teacherService.findOne({
      userId: req.user._id
    });

    console.log(teacherModel);
    
    let createTestObj = {
      ...createObject,
    };

    if(req.user.role !== 'ADMIN') {
      createTestObj = {
        ...createObject,
        user: req.user._id,
        teacher: teacherModel._id
      }
    }

    return success(
      'Test created successfully!',
      this.service.create(createTestObj)
    );
  }

  @ValidateToken()
  @Get()
  findAllTests(@Req() req) {
    const {user} = req;
    let where = {};
    if(user.role !== 'ADMIN') {
      where =  {
        user: user._id
      }
    }

    return success('List found successfully', this.service.findAll(where));
  }

  @Get(':testId')
  async getTestById(@Param('testId') testId ) {
    const testModel = await this.service.findById(testId);
    return success('Test found!', this.service.getPublicDetails(testModel));
  }
}