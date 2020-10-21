import { Get, Injectable, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { CoursesService } from 'src/services/courses.service';
import { LiveStreamsService } from './liveStreams.service';
import { success } from 'src/utils';

@Injectable()
export class ProductsService extends DBService {
  constructor(@InjectModel('Product') model: Model<any>,
    private coursesService: CoursesService,
    private liveStreamsService: LiveStreamsService, 
  ) {
    super(model);
  }

  findAll() {
    return super.findAll().populate('productImageId').populate('user').sort('-_id');
  }

  async createProduct(body, userId) {
    return this.create({ ...body, user: userId });
  }

  // async addProduct(requestBody) {
  //   return await this.create(requestBody);
  // }

  async addCourse(requestBody) {
    return await this.coursesService.create(requestBody);
  }

  async liveStream(requestBody) {
    return await this.liveStreamsService.create(requestBody);
  }
}