import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { UserBindingInstance } from 'twilio/lib/rest/chat/v2/service/user/userBinding';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';

@Controller('users')
export class UsersController extends ResourceController {
  constructor(
    service: UsersService,
    private authService: AuthService,
    private emailsService: EmailService,
  ) {
    super(service);
  }

  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @Get('get-admins')
  getAdmins() {
    return this.service.getAdmins();
  }

  @ValidateToken()
  @Get('get-user-details')
  async getUserDetails(@Req() req) {
    const { user: loggedInUser } = req;
    const studentModel = await this.service
      .findById(loggedInUser._id)
      .populate('userId');
    return success(
      'Teacher found!',
      this.service.getPublicDetails(studentModel),
    );
  }

  @Get(':userId/get-user-details')
  async getUsersDetails(@Param('userId') userId) {
    const userModel = await this.service.findById(userId);
    return success('user found!', {
      user: this.service.getPublicDetails(userModel),
    });
  }
  @Post(':userId/update-password')
  async updatePassword(@Param('userId') userId, @Body() requestBody) {
    const { currentPassword } = requestBody;
    await this.authService.updatePassword(userId, currentPassword);
    return await this.afterUpdatePassword(userId, currentPassword);
  }

  async afterUpdatePassword(userId, currentPassword) {
    const userModel = await this.service.findById(userId);
    const email = userModel.email;
    const role = userModel.role;
    const link = `${this.authService.hostUrl(role)}`;
    await this.emailsService.sendUpdatedPasswordNotification(
      userModel,
      currentPassword,
      link,
    );
    return {
      message: `Password sent to ${userModel.firstName}'s email!`,
    };
  }
}
