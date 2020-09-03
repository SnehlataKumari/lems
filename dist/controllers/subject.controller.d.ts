import { ResourceController } from './resource.controller';
import { SubjectsService } from 'src/services/subject.service';
import { AssetsService } from 'src/services/assets.service';
import { ChaptersService } from 'src/services/chapters.service';
export declare class SubjectsController extends ResourceController {
    private assetService;
    private chaptersService;
    constructor(service: SubjectsService, assetService: AssetsService, chaptersService: ChaptersService);
    getAllAssets(id: any, req: any): Promise<{
        message: string;
        data: any;
    }>;
    getAllChapters(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
