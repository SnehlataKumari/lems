import { AuthService } from 'src/services/auth.service';
import { TokensService } from 'src/services/tokens.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UsersService } from 'src/services/users.service';
import { OtpService } from 'src/services/otp.service';
export declare class AuthController {
    private config;
    private tokenService;
    private service;
    private userService;
    private otpService;
    private tokensService;
    constructor(config: ConfigService, tokenService: TokensService, service: AuthService, userService: UsersService, otpService: OtpService, tokensService: TokensService);
    get hostUrl(): any;
    signUp(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    signUpStudent(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    socialSignUpStudent(requestBody: any): Promise<{
        message: string;
        data: any;
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
    verify(token: any, res: Response): Promise<any>;
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
    changePassword(req: any, requestBody: any): Promise<any>;
    editProfile(req: any, requestBody: any): Promise<{
        user: any;
        teacher: any;
    }>;
    getUserModel(requestBody: any): Promise<any>;
    sendOtp(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    otpLogin(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    socialLoginStudent(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    passwordHash(text: any): Promise<any>;
}
