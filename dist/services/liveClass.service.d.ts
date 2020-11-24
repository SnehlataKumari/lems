import { DBService } from './db.service';
import { Model } from 'mongoose';
import { TeachersService } from './teachers.service';
export declare class LiveClassService extends DBService {
    private teacherService;
    constructor(model: Model<any>, teacherService: TeachersService);
    findAll(): import("mongoose").DocumentQuery<any[], any, {}>;
    createLiveClass(body: any, userId: any): Promise<any>;
    createLiveClassByAdmin(body: any): Promise<void>;
    getLiveClassByTeacherId(userId: any): Promise<any[]>;
    getLiveClassCreatedByTeacher(): Promise<any[]>;
    getLiveClassCreatedByAdmin(): Promise<any[]>;
    getLiveDemoClasses(): Promise<any[]>;
    deleteLiveClassById(liveClassId: any): Promise<boolean>;
}
