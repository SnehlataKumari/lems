import { ResourceController } from './resource.controller';
import { AssetsService } from 'src/services/assets.service';
export declare class AssetsController extends ResourceController {
    constructor(service: AssetsService);
    createVideo(createObject: any, file: any): Promise<{
        message: string;
        data: any;
    }>;
    updateVideo(id: any, createObject: any, file: any): Promise<{
        message: string;
        data: any;
    }>;
}
