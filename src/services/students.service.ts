import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DBService } from './db.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Injectable()
export class StudentsService extends DBService {
    constructor(@InjectModel('Student') model: Model<any>,
        private userService: UsersService,
    ) {
        super(model);
    }

    async deleteTeacherById(teacherId) {
        const teacherModel = await this.findById(teacherId).populate('userId');
        const userModel = teacherModel.userId;
        // FIXME: Delete multiple model in transaction.
        teacherModel.remove();
        userModel.remove();
        return true;
    }

    async hasAcceptedRegistrationRequest(requestBody, teacherId) {
        const teacherModel = await this.findById(teacherId);
        if (teacherModel) {
            if (requestBody.accept === true) {
                await this.update(teacherModel, { hasAcceptedRegistrationRequest: requestBody.accept });
                return { message: 'Registration form accepted.' }
            }
        }
    }

    findAll(where = {}) {
        return super.findAll(where).populate('userId').sort('-_id');
    }

    findById(id) {
        return super.findById(id).populate('userId');
    }

    async findByToken(token) {
        const teacher = await this.findOne(token);
        return teacher;
    }

    // via Teacher----------------------------------------------------------------------------
    async editTeacherProfile(requestBody, loggedInUser) {
        const teacher = await this.findOne({
            userId: loggedInUser._id
        });
        const user = await this.userService.findById(teacher.userId);
        await this.userService.update(user, requestBody.user);
        return await this.update(teacher, requestBody.teacher);
    }

    // via Admin----------------------------------------------------------------------------------------------------
    async updateProfile(teacherId, requestBody) {
        const teacher = await this.findById(teacherId);
        if (!teacher) {
            throw new UnauthorizedException('user not found!');
        }
        const userId = teacher.userId;
        const userModel = await this.userService.update(userId, requestBody.user);
        const teacherModel = await this.update(teacherId, requestBody.teacher);
        return {
            user: userModel,
            teacher: teacherModel
        }
    }
}
