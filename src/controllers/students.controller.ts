import { Controller, Get, Req, Put, Param, Body, BadRequestException } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { UsersService } from 'src/services/users.service';
import { StudentsService } from 'src/services/students.service';

@Controller('students')
export class StudentsController extends ResourceController {
	constructor(
		service: StudentsService,
		private userService: UsersService
	) {
		super(service);
	}

	@ValidateToken()
	@Get('get-student-details')
	async getTeacherDetails(@Req() req) {
		const { user: loggedInUser } = req;
		const teacherModel = await this.service.findOne({
			userId: loggedInUser._id
		}).populate('userId');

		return success('Student found!', {
			student: this.service.getPublicDetails(teacherModel),
			user: this.userService.getPublicDetails(loggedInUser)
		});
	}

	@Put(':id/update-profile')
	async updateStudentProfile(@Param('id') studentId, @Body() requestBody) {
		let studentModel = await this.service.findById(studentId);
		if (!studentModel) {
			throw new BadRequestException('Student not found!');
		}

		let userModel = await this.userService.findById(studentModel.userId);
		if(!userModel) {
			throw new BadRequestException('User not found!');
		}

		userModel = await this.userService.update(userModel, requestBody.user);
		studentModel = await this.service.update(studentModel, requestBody.student);

		return success('Student Profile updated successfully!', {
			user: this.userService.getPublicDetails(userModel),
			teacher: this.service.getPublicDetails(studentModel)
		});
	}
}