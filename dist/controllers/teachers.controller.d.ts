import { TeachersService } from 'src/services/teachers.service';
import { ResourceController } from './resource.controller';
export declare class TeachersController extends ResourceController {
    constructor(service: TeachersService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
    getTeacherDetails(req: any): Promise<{
        message: string;
        data: any;
    }>;
    findById(req: any): Promise<{
        message: string;
        data: any;
    }>;
    deleteTeacherById(teacherId: any): Promise<{
        message: string;
        data: any;
    }>;
    acceptRejectRegistrationRequest(requestBody: any, teacherId: any): Promise<any>;
    editTeacherProfile(requestBody: any, token: any): Promise<{
        message: string;
        data: any;
    }>;
}
