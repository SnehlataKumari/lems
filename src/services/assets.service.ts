import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { FileService } from './file.service';
import { VersionService } from './version.service';

@Injectable()
export class AssetsService extends DBService {
  constructor(
    @InjectModel('Asset') model: Model<any>,
    private fileService: FileService,
    private versionService: VersionService,
  ) {
    super(model);
  }

  async saveFile(file) {
    return this.fileService.saveFile(file);
  }

  async withIsSubscribedKey(assetsList, user) {
    const { version } = await this.versionService.findOne({});
    return assetsList.map(a => ({
      ...a.toJSON(),
      isSubscribed: user.isSubscribed,
      version,
    }));
  }
}
