import { Controller, Get, Put, Delete, Body, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { TeachersService } from 'src/services/teachers.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import Joi = require('@hapi/joi');
import { JoiValidationPipe } from 'src/pipes/joivalidation.pipe';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { UsersService } from 'src/services/users.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';

const acceptRequestSchema = Joi.object({
  accept: Joi.boolean()
});

@Controller('teachers')
export class TeachersController extends ResourceController {
  constructor(
    service: TeachersService,
    private authService: AuthService,
    private userService: UsersService,
    private emailService: EmailService
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
// via Teacher-------------------------------------------------------------------------
  @Put('edit-teacher-profile')
  async editTeacherProfile(@Body() requestBody, @Param() token) {
    await this.service.editTeacherProfile(requestBody, token);
    return success('Profile updated successfully', {});
  }
// via Admin---------------------------------------------------------------------------

  @ValidateToken()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profileFile', maxCount: 1 },
  ]))
  @Put(`:teacherId/update-profile`)
  async updateProfile(@Param('teacherId') teacherId, @Body() requestBody) {
    return await this.service.updateProfile(teacherId, requestBody);
  }

  @ValidateToken()
  @Put('/:id')
  async updateResource(@Param('id') id, @Body() resourceObject) {
    return success(
      'Resource updated successfully!',
      this.service.findByIdAndUpdate(id, resourceObject),
    );
  }

  @ValidateToken()
  @Put('/:teacherId/accept-registration-request')
  async acceptRegistrationRequest(@Param('teacherId') id) {
    const teacherModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRegistrationRequest: true });
    // teacherModel = await this.service.findById(id);
    const randomPassword = this.authService.getRandomPassword();

    const userModel = await this.authService.updatePassword(teacherModel.userId, randomPassword);
    this.emailService.sendRegistrationAccepted(userModel, { password: randomPassword, hostUrl: this.authService.hostUrl(userModel.role)});
    return success(
      'Teacher registration accepted successfully!',
      this.service.getPublicDetails(teacherModel),
    );
  }

  @ValidateToken()
  @Put('/:teacherId/reject-registration-request')
  async rejectRegistrationRequest(@Param('teacherId') id) {
    const teacherModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRegistrationRequest: false });
    const userModel = await this.userService.findById(teacherModel.userId);
    await this.emailService.sendRegistrationRejected(userModel);

    return success(
      'Teacher registration rejected successfully!',
      teacherModel,
    );
  }
}