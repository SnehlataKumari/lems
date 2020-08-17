import { Controller, Get, Delete, Body, Param, Post } from '@nestjs/common';
import { TeachersService } from 'src/services/teachers.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import Joi = require('@hapi/joi');
import { JoiValidationPipe } from 'src/pipes/joivalidation.pipe';

const acceptRequestSchema = Joi.object({
  accept: Joi.boolean()
});

@Controller('teachers')
export class TeachersController extends ResourceController {
  constructor(service: TeachersService) {
    super(service);
  }

  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
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

}