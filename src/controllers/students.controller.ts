import { Controller, Get, Req, Put, Param, Body, BadRequestException, UseInterceptors, UploadedFile, Res, Delete } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { UsersService } from 'src/services/users.service';
import { StudentsService } from 'src/services/students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('students')
export class StudentsController extends ResourceController {
	constructor(
		service: StudentsService,
		private userService: UsersService,
		private config: ConfigService
	) {
		super(service);
	}

	@ValidateToken()
	@Get()
	async findAll() {
    const students = await this.service.findAll();
    const studentsList = students
      .filter((student) => !!student.userId)
      .map(student => {
			const userObj = this.userService.getPublicDetails(student.userId);
			const studentObj = this.service.getPublicDetails(student);

			return ({
				user: userObj,
				student: studentObj
			})
		});
		return success('students found successfully', studentsList);
	}

	@ValidateToken()
	@Delete('/:id')
	async deleteResource(@Param('id') id) {
		const studentModel = await this.service.findById(id);
		if (!studentModel) {
			throw new BadRequestException('Student not found!');
		}

		await this.userService.findByIdAndDelete(studentModel.userId);
		await this.service.findByIdAndDelete(id);
		return success('Resource deleted successfully!', {
			id,
		});
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

	@Put(':id/update-profile-pic')
	@UseInterceptors(FileInterceptor('file', {
		storage: diskStorage({
			destination: './avatars',
			filename: (req, file, cb) => {
				const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
				return cb(null, `${randomName}${extname(file.originalname)}`)
			}
		})
	}))
	async updateStudentProfilePic(@Param('id') studentId, @UploadedFile() file) {
		const hostUrl = this.config.get('HOST_URL');
		const profileImagePath = `${hostUrl}/${file.path}`;

		const studentModel = await this.service.findById(studentId);
		if(!studentModel) {
			throw new BadRequestException('Student not found!');
		}
		let userModel = await this.userService.findById(studentModel.userId);
		if(!userModel) {
			throw new BadRequestException('User not found!');
		}

		userModel = await this.userService.update(userModel, {
			profileImage: profileImagePath
		});

		return success('Profile pic uploaded successfully!', {
			user: this.userService.getPublicDetails(userModel),
			student: this.service.getPublicDetails(studentModel)
		});
  }

	@Put(':id/update-profile-pic-base64')
	@UseInterceptors(FileInterceptor('file', {
		storage: diskStorage({
			destination: './avatars',
			filename: (req, file, cb) => {
				const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
				return cb(null, `${randomName}${extname(file.originalname)}`)
			}
		})
	}))
	async updateStudentProfilePicBase64(@Param('id') studentId, @UploadedFile() file, @Body() requestBody) {

		const studentModel = await this.service.findById(studentId);
		if(!studentModel) {
			throw new BadRequestException('Student not found!');
		}
		let userModel = await this.userService.findById(studentModel.userId);
		if(!userModel) {
			throw new BadRequestException('User not found!');
		}
    
		userModel = await this.userService.update(userModel, {
			profileImage: requestBody.file
		});

		return success('Profile pic uploaded successfully!', {
			user: this.userService.getPublicDetails(userModel),
			student: this.service.getPublicDetails(studentModel)
		});
	}
	
}