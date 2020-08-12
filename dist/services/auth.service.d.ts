import { UsersService } from './users.service';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    login(requestBody: any): Promise<any>;
    encryptPassword(password: any): Promise<any>;
}
