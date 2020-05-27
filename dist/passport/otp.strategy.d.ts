import { Strategy } from 'passport-custom';
import { AuthService } from 'src/services/auth.service';
import { Request } from 'express';
declare const OTPStrategy_base: new (...args: any[]) => Strategy;
export declare class OTPStrategy extends OTPStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: Request): Promise<any>;
}
export {};
