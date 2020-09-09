import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
export declare class UsersController extends ResourceController {
    private authService;
    private emailsService;
    constructor(service: UsersService, authService: AuthService, emailsService: EmailService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
    getUserDetails(userId: any): Promise<{
        message: string;
        data: any;
    }>;
    updatePassword(userId: any, requestBody: any): Promise<{
        message: string;
    }>;
    afterUpdatePassword(userId: any, currentPassword: any): Promise<{
        message: string;
    }>;
}
