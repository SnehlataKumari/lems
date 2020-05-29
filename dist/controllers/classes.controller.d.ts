import { ResourceController } from './resource.controller';
import { ClassesService } from 'src/services/classes.service';
import { ChaptersService } from 'src/services/chapters.service';
export declare class ClassesController extends ResourceController {
    private chapterService;
    constructor(service: ClassesService, chapterService: ChaptersService);
    getAllChapters(classId: any): Promise<any[]>;
}
