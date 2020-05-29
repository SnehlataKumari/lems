import { UsersService } from "./users.service";
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    requestOTP(user: any): Promise<any>;
    validateUser(mobileNumber: any, otp: any): Promise<any>;
    clearOTP(user: any): Promise<any>;
    postLogin(user: any, { deviceId }: {
        deviceId: any;
    }): Promise<any>;
    validateAuth(payload: any): Promise<any>;
}
