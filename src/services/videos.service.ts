import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { FileService } from './file.service';

@Injectable()
export class VideosService extends DBService {
  constructor(@InjectModel('Video') model: Model<any>, private fileService: FileService) {
    super(model);
  }

  async saveFile(file) {
    return this.fileService.saveFile(file);
  }
}