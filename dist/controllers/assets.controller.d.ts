import { ResourceController } from './resource.controller';
import { AssetsService } from 'src/services/assets.service';
export declare class AssetsController extends ResourceController {
    constructor(service: AssetsService);
    findAllAssets(req: any): Promise<{
        message: string;
        data: any;
    }>;
    createAsset(createObject: any): Promise<{
        message: string;
        data: any;
    }>;
    updateAsset(id: any, updateObject: any): Promise<{
        message: string;
        data: any;
    }>;
    uploadAssetsTos3(files: any): Promise<{
        videoS3: any;
        pdfS3: any;
    }>;
}
