import { DBService } from './db.service';
import { Model } from 'mongoose';
import { TeachersService } from './teachers.service';
export declare class LiveClassService extends DBService {
    private teacherService;
    constructor(model: Model<any>, teacherService: TeachersService);
    findAll(): import("mongoose").DocumentQuery<any[], any, {}>;
    createLiveClass(body: any, userId: any): Promise<any>;
    getLiveClassByTeacherId(userId: any): Promise<any[]>;
}
