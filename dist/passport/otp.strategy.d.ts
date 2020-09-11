import { Strategy } from 'passport-custom';
import { AuthService } from 'src/services/auth.service';
declare const OTPStrategy_base: new (...args: any[]) => Strategy;
export declare class OTPStrategy extends OTPStrategy_base {
    private authService;
    constructor(authService: AuthService);
}
export {};
