import { ResourceController } from './resource.controller';
import { UsersService } from 'src/services/users.service';
import { StudentsService } from 'src/services/students.service';
import { ConfigService } from '@nestjs/config';
export declare class StudentsController extends ResourceController {
    private userService;
    private config;
    constructor(service: StudentsService, userService: UsersService, config: ConfigService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
    deleteResource(id: any): Promise<{
        message: string;
        data: any;
    }>;
    getTeacherDetails(req: any): Promise<{
        message: string;
        data: any;
    }>;
    updateStudentProfile(studentId: any, requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    updateStudentProfilePic(studentId: any, file: any): Promise<{
        message: string;
        data: any;
    }>;
    updateStudentProfilePicBase64(studentId: any, file: any, requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
}
