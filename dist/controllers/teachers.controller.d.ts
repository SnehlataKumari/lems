import { TeachersService } from 'src/services/teachers.service';
import { ResourceController } from './resource.controller';
import { UsersService } from 'src/services/users.service';
export declare class TeachersController extends ResourceController {
    private userService;
    constructor(service: TeachersService, userService: UsersService);
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
    getTeachersDetails(teacherId: any): Promise<{
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
    updateProfile(teacherId: any, requestBody: any): Promise<void>;
}
