import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TeachersService } from './teachers.service';


@Injectable()
export class LiveClassService extends DBService {
  constructor(@InjectModel('LiveClass') model: Model<any>,
  private teacherService: TeachersService,
  ) {
    super(model);
  }

  findAll() {
    return super.findAll().populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
  }

  async createLiveClass(body, userId) {
    const teacher = await this.teacherService.findOne({userId: userId});
    const teacherId = teacher._id;
    return this.create({...body, teacher: teacherId, user: userId});
  }

  async createLiveClassByAdmin(body) {
    try {
      const response = await this.create({ ...body, hasAcceptedRequest: true, isCreatedByAdmin: true}); 
    } catch (error) {
    }
  }

  async getLiveClassByTeacherId( userId ) {
    const teacher = await this.teacherService.findOne({ userId: userId });
    const teacherId = teacher._id;
    const liveClassesList = await this.find({
      teacher: teacherId,
      // hasAcceptedRequest: true
    }).sort('-_id');
    return liveClassesList;
    
  }

  async getLiveClassCreatedByTeacher() {
    const liveClassesList = await this.find(
      { isCreatedByAdmin: false }
    ).populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
    return liveClassesList;
  }

  async getLiveClassCreatedByAdmin() {
    const liveClassesList = await this.find(
      { isCreatedByAdmin: true }
    ).populate('posterDocumentId').populate('teacher').populate('user').sort('-_id');
    return liveClassesList;
  }

  async deleteLiveClassById(liveClassId) {
    const liveClassModel = await this.findById(liveClassId);
    liveClassModel.remove();
    return true;
  }
}