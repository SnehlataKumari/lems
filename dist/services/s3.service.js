"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
let S3Service = (() => {
    let S3Service = class S3Service {
        constructor(configService) {
            this.configService = configService;
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
                ACL: 'private',
                Body: fileData,
            };
            console.log('start of upload');
            const data = await this.s3Client.upload(params).promise();
            console.log('End of upload');
            return {
                response: data,
                fileName: fileName,
            };
        }
    };
    S3Service = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [config_1.ConfigService])
    ], S3Service);
    return S3Service;
})();
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map