import { UsersService } from "src/services/users.service";
import { AuthService } from "src/services/auth.service";
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private service;
    private usersService;
    private jwtService;
    constructor(service: AuthService, usersService: UsersService, jwtService: JwtService);
    requestOtp(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    login(req: any): Promise<any>;
}
