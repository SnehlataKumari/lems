import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';
import { ChaptersService } from 'src/services/chapters.service';
import { AssetsService } from 'src/services/assets.service';
import { SubjectsService } from 'src/services/subject.service';
export declare class ClassesController extends ResourceController {
    private chapterService;
    private assetService;
    private subjectService;
    constructor(service: ClassesService, chapterService: ChaptersService, assetService: AssetsService, subjectService: SubjectsService);
    getAllChapters(classId: any, queries: any): Promise<any[]>;
    getAllAssets(id: any): Promise<{
        message: string;
        data: any;
    }>;
    getAllSubjects(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
