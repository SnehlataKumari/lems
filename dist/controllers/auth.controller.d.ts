import { UsersService } from 'src/services/users.service';
import { AuthService } from 'src/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/services/sms.service';
import { VersionService } from 'src/services/version.service';
import { TokensService } from 'src/services/tokens.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';
export declare class AuthController {
    private config;
    private service;
    private usersService;
    private tokensService;
    private jwtService;
    private emailService;
    private smsService;
    private versionService;
    constructor(config: ConfigService, service: AuthService, usersService: UsersService, tokensService: TokensService, jwtService: JwtService, emailService: EmailService, smsService: SmsService, versionService: VersionService);
    get hostUrl(): any;
    signUp(req: any): Promise<{
        link: string;
        message: string;
        users: any;
    }>;
    resendVerificationLink(requestBody: any): Promise<{
        message: string;
        link: string;
    }>;
    verify(token: any): Promise<string>;
    login(user: any): Promise<{
        message: string;
        data: any;
    }>;
    forgot(body: any): Promise<string>;
    resetPassword(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    checkToken(req: any): any;
    logout(user: any): Promise<{
        message: string;
        data: any;
    }>;
}
