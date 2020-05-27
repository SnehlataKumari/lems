import { ConfigService } from "@nestjs/config";
export declare class S3Service {
    private configService;
    s3Client: any;
    bucketName: any;
    constructor(configService: ConfigService);
    createFolder(folderName: any): Promise<{
        response: any;
        folderName: any;
    }>;
    uploadFile(fileName: any, fileData: any): Promise<{
        response: any;
        fileName: any;
    }>;
}
