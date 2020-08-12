import { Strategy } from 'passport-jwt';
import { AuthService } from 'src/services/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(request: Request, payload: any): Promise<any>;
}
export {};
