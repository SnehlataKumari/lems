import { Injectable } from "@nestjs/common";
import { S3Service } from "./s3.service";

@Injectable()
export class FileService {

  constructor(private s3Service: S3Service) { }

  async saveFile(file) {
    return await this.s3Service.uploadFile(file.originalname, file.buffer);
  }
}