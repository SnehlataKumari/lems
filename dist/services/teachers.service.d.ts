import { DBService } from './db.service';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
export declare class TeachersService extends DBService {
    private userService;
    constructor(model: Model<any>, userService: UsersService);
    deleteTeacherById(teacherId: any): Promise<boolean>;
    hasAcceptedRegistrationRequest(requestBody: any, teacherId: any): Promise<{
        message: string;
    }>;
    findAll(where?: {}): import("mongoose").DocumentQuery<any[], any, {}>;
    findByToken(token: any): Promise<any>;
    editTeacherProfile(requestBody: any, token: any): Promise<any>;
}
