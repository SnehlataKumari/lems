import { TeachersService } from 'src/services/teachers.service';
import { ResourceController } from './resource.controller';
import { UsersService } from 'src/services/users.service';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
export declare class TeachersController extends ResourceController {
    private authService;
    private userService;
    private emailService;
    constructor(service: TeachersService, authService: AuthService, userService: UsersService, emailService: EmailService);
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
    updateProfile(teacherId: any, requestBody: any): Promise<any>;
    updateResource(id: any, resourceObject: any): Promise<{
        message: string;
        data: any;
    }>;
    acceptRegistrationRequest(id: any): Promise<{
        message: string;
        data: any;
    }>;
    rejectRegistrationRequest(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
