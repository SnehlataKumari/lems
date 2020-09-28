import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { FileService } from './file.service';
import { VersionService } from './version.service';

@Injectable()
export class DocumentsService extends DBService {
  constructor(
    @InjectModel('Document') model: Model<any>,
    private fileService: FileService,
  ) {
    super(model);
  }

  async saveFile(file) {
    return this.fileService.saveFile(file);
  }

}