/// <reference types="mongoose" />
import { UsersService } from './users.service';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';
import { TeachersService } from './teachers.service';
import { DBTransactionService } from './dbtransaction.service';
import { StudentsService } from './students.service';
import { SmsService } from './sms.service';
import { SocialLoginService } from './socialLogin.service';
export declare class AuthService {
    private userService;
    private tokenService;
    private configs;
    private jwtService;
    private emailsService;
    private smsService;
    private teacherService;
    private transaction;
    private socialLoginService;
    private studentService;
    constructor(userService: UsersService, tokenService: TokensService, configs: ConfigService, jwtService: JwtService, emailsService: EmailService, smsService: SmsService, teacherService: TeachersService, transaction: DBTransactionService, socialLoginService: SocialLoginService, studentService: StudentsService);
    hostUrl(role: any): any;
    getUserToken(userObj: any): string;
    signUp(requestBody: any, role?: string): Promise<{
        message: string;
        data: any;
    }>;
    updatePassword(userId: any, currentPassword: any): Promise<any>;
    getRandomPassword(): string;
    socialSignupStudent(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    socialLoginStudent(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    signUpTeacher(requestBody: any, files: any): Promise<{
        message: string;
        user: any;
    }>;
    apiUrl(role?: any): any;
    verifyToken(token: any, res: any): Promise<any>;
    resendVerificationLink(email: any, role?: string): Promise<{
        message: string;
    }>;
    login({ email, password }: {
        email: any;
        password: any;
    }, role?: string): Promise<{
        message: string;
        data: any;
    }>;
    forgotPassword(email: any, role?: string): Promise<{
        message: string;
        forgotToken: any;
    }>;
    resetPassword(currentPassword: any, token: any): Promise<{
        message: string;
        data: any;
    }>;
    encryptPassword(password: any): Promise<any>;
    isValidAuthToken(token: any): Promise<any>;
    getUserById(id: any): import("mongoose").DocumentQuery<any, any, {}>;
    changePassword(loggedInUser: any, requestBody: any): Promise<any>;
    editProfile(loggedInUser: any, requestBody: any): Promise<{
        user: any;
        teacher: any;
    }>;
    sendOtp(userModel: any): Promise<void>;
}
