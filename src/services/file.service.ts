import { Injectable } from "@nestjs/common";
import { promises as fsPromises } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async saveFile(file) {
    const uploadPath = join(__dirname, '../../uploads', file.originalname);
    await fsPromises.writeFile(uploadPath, file.buffer);
    return ({
      fileUrl: `/${file.originalname}`
    });
  }
}