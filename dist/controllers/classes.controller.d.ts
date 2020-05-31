import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';
import { ChaptersService } from 'src/services/chapters.service';
import { AssetsService } from 'src/services/assets.service';
export declare class ClassesController extends ResourceController {
    private chapterService;
    private assetService;
    constructor(service: ClassesService, chapterService: ChaptersService, assetService: AssetsService);
    getAllChapters(classId: any, queries: any): Promise<any[]>;
    getAllAssets(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
