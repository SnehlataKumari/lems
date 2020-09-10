import { Controller, Get, Req } from '@nestjs/common';
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
}