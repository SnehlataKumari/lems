import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Injectable()
export class TeachersService extends DBService {
  constructor(@InjectModel('Teacher') model: Model<any> ,
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

  async hasAcceptedRegistrationRequest(requestBody, teacherId){
    const teacherModel = await this.findById(teacherId);
    if(teacherModel){
      if (requestBody.accept === true) {
        await this.update(teacherModel, { hasAcceptedRegistrationRequest: requestBody.accept});
        return { message: 'Registration form accepted.' }
      }
    } 
  }

  findAll(where = {}) {
    return super.findAll(where).populate('userId').sort('-_id');
  }

  async findByToken(token){
    const teacher= await this.findOne(token);
    return teacher;
  }
  async editTeacherProfile(requestBody, token) {
    const teacher = await this.findByToken(token);
    const user= await this.userService.findOne(teacher.userId);
    await this.userService.update(user, requestBody.user);
    const teacherObject = await this.findOne(teacher.userId);
    return await this.update(teacherObject, requestBody.teacher);

  }
}
