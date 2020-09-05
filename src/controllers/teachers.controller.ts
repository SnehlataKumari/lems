import { Controller, Get, Put, Delete, Body, Param, Post, Req } from '@nestjs/common';
import { TeachersService } from 'src/services/teachers.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import Joi = require('@hapi/joi');
import { JoiValidationPipe } from 'src/pipes/joivalidation.pipe';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { UsersService } from 'src/services/users.service';

const acceptRequestSchema = Joi.object({
  accept: Joi.boolean()
});

@Controller('teachers')
export class TeachersController extends ResourceController {
  constructor(
    service: TeachersService,
    private userService: UsersService
  ) {
    super(service);
  }

  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @ValidateToken()
  @Get('get-teacher-details')
  async getTeacherDetails(@Req() req) {
    const { user: loggedInUser } = req;
    const teacherModel = await this.service.findOne({
      userId: loggedInUser._id
    }).populate('userId');
    return success('Teacher found!', this.service.getPublicDetails(teacherModel));
  }

  @Get(':teacherId')
  async findById(@Req() req) {
    const teacherId = req.teacherId;
    return success('List found successfully', this.service.findById(teacherId));
  }

  @Get(':teacherId/get-teacher-details')
  async getTeachersDetails(@Param('teacherId') teacherId) {
    const teacherModel = await this.service.findById(teacherId);
    const userModel = await this.userService.findById(teacherModel.userId);
    return success('Teacher found!', {
      teacher: this.service.getPublicDetails(teacherModel),
      user: this.userService.getPublicDetails(userModel)
    });
  }

  @Delete(':teacherId')
  async deleteTeacherById(@Param('teacherId') teacherId){
    await this.service.deleteTeacherById(teacherId);
    return success('Teacher deleted successfully', {});
  }

  @Post(':teacherId/accept-reject-registration-request')
  async acceptRejectRegistrationRequest(@Body(new JoiValidationPipe(acceptRequestSchema)) requestBody, @Param('teacherId') teacherId ) {
    return await this.service.hasAcceptedRegistrationRequest (requestBody, teacherId);
  }

  @Put('edit-teacher-profile')
  async editTeacherProfile(@Body() requestBody, @Param() token) {
    await this.service.editTeacherProfile(requestBody, token);
    return success('Profile updated successfully', {});
  }

}