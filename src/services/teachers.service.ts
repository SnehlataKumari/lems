import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TeachersService extends DBService {
  constructor(@InjectModel('Teacher') model: Model<any> ,
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
}
