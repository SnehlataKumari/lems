import { UsersService } from "src/services/users.service";
import { AuthService } from "src/services/auth.service";
import { JwtService } from '@nestjs/jwt';
import { SmsService } from "src/services/sms.service";
import { VersionService } from "src/services/version.service";
export declare class AuthController {
    private service;
    private usersService;
    private jwtService;
    private smsService;
    private versionService;
    constructor(service: AuthService, usersService: UsersService, jwtService: JwtService, smsService: SmsService, versionService: VersionService);
    requestOtp(requestBody: any): Promise<{
        message: string;
        data: any;
    } | "Error">;
    createAdmin(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    loginAdmin(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    login(req: any): Promise<{
        access_token: string;
        user: any;
    }>;
    updateVersion(req: any): Promise<any>;
}
