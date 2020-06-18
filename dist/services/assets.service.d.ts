import { Model } from 'mongoose';
import { DBService } from './db.service';
import { FileService } from './file.service';
import { VersionService } from './version.service';
export declare class AssetsService extends DBService {
    private fileService;
    private versionService;
    constructor(model: Model<any>, fileService: FileService, versionService: VersionService);
    saveFile(file: any): Promise<{
        response: any;
        fileName: any;
    }>;
    withIsSubscribedKey(assetsList: any, user: any): Promise<any>;
}
