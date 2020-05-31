import { ResourceController } from './resource.controller';
import { ChaptersService } from 'src/services/chapters.service';
import { AssetsService } from 'src/services/assets.service';
export declare class ChaptersController extends ResourceController {
    private assetService;
    constructor(service: ChaptersService, assetService: AssetsService);
    getAllAssets(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
