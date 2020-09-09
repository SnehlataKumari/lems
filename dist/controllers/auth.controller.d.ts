import { AuthService } from 'src/services/auth.service';
import { TokensService } from 'src/services/tokens.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private config;
    private service;
    private tokensService;
    constructor(config: ConfigService, service: AuthService, tokensService: TokensService);
    get hostUrl(): any;
    signUp(requestBody: any): Promise<{
        message: string;
        userModel: any;
    }>;
    signUpStudent(requestBody: any): Promise<{
        message: string;
        userModel: any;
    }>;
    signupTeacher(requestBody: any, files: any): Promise<{
        message: string;
        user: any;
    }>;
    resendVerificationLink(requestBody: any): Promise<{
        message: string;
    }>;
    login(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    loginAdmin(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    loginUser(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    verify(token: any): Promise<string>;
    forgot(requestBody: any): Promise<{
        message: string;
        forgotToken: any;
    }>;
    forgotAdmin(requestBody: any): Promise<{
        message: string;
        forgotToken: any;
    }>;
    forgotStudent(requestBody: any): Promise<{
        message: string;
        forgotToken: any;
    }>;
    resetPassword(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    logout(loggedInUser: any): Promise<{
        message: string;
        data: any;
    }>;
    changeTeacherPassword(req: any, requestBody: any): Promise<any>;
    editProfile(req: any, requestBody: any): Promise<{
        user: any;
        teacher: any;
    }>;
}
