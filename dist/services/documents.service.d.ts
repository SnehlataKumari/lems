import { Model } from 'mongoose';
import { DBService } from './db.service';
import { FileService } from './file.service';
export declare class DocumentsService extends DBService {
    private fileService;
    constructor(model: Model<any>, fileService: FileService);
    saveFile(file: any): Promise<{
        response: any;
        fileName: any;
    }>;
}
