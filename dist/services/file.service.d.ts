import { S3Service } from "./s3.service";
export declare class FileService {
    private s3Service;
    constructor(s3Service: S3Service);
    saveFile(file: any): Promise<{
        response: any;
        fileName: any;
    }>;
}
