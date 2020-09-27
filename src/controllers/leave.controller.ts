import { Controller } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { LeaveService } from 'src/services/leave.service';
import { TeachersService } from 'src/services/teachers.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { success } from 'src/utils';

@Controller('leave')
export class LeaveController extends ResourceController {
  constructor(
    service: LeaveService,
    private teacherService: TeachersService
  ) {
    super(service);
  }

  @ValidateToken()
  @Post()
  async createLeave(@Body() createObject, @Req() req) {
    const teacherModel = await this.teacherService.findOne({
      userId: req.user._id
    });
    let createLeaveObj = {
      ...createObject,
    };

    if (req.user.role !== 'ADMIN') {
      createLeaveObj = {
        ...createObject,
        user: req.user._id,
        teacher: teacherModel._id
      }
    }

    return success(
      'Test created successfully!',
      this.service.create(createLeaveObj)
    );
  }
}