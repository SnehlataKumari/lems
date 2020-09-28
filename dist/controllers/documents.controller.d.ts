import { ResourceController } from './resource.controller';
import { DocumentsService } from 'src/services/documents.service';
import { ConfigService } from '@nestjs/config';
export declare class DocumentsController extends ResourceController {
    private config;
    constructor(config: ConfigService, service: DocumentsService);
    findAllAssets(req: any): Promise<{
        message: string;
        data: any;
    }>;
    createAsset(createObject: any): Promise<{
        message: string;
        data: any;
    }>;
    getRoleBasedDocuments(req: any): Promise<{
        message: string;
        data: any;
    }>;
    uploadFile(file: any): Promise<any>;
    seeUploadedFile(image: any, res: any): any;
    getSampleFile(image: any, res: any): any;
    updateAsset(id: any, updateObject: any): Promise<{
        message: string;
        data: any;
    }>;
    uploadAssetsTos3(files: any): Promise<{
        videoS3: any;
        pdfS3: any;
    }>;
}
