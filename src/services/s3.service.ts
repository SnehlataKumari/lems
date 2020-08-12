import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  s3Client;
  bucketName;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get('S3Bucket');

    AWS.config.update({
      accessKeyId: this.configService.get('AWSAccessKeyId'),
      secretAccessKey: this.configService.get('AWSSecretKey'),
      region: this.configService.get('AWSregion'),
    });

    this.s3Client = new AWS.S3({ apiVersion: '2006-03-01' });
  }

  async createFolder(folderName) {
    const params = {
      Bucket: this.bucketName,
      Key: `${folderName}/`,
      Body: 'body does not matter',
    };

    const data = await this.s3Client.upload(params).promise();

    return {
      response: data,
      folderName: folderName,
    };
  }

  async uploadFile(fileName, fileData) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      ACL: 'public-read',
      Body: fileData,
    };

    const data = await this.s3Client.upload(params).promise();
    return {
      response: data,
      fileName: fileName,
    };
  }
}
