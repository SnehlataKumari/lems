/// <reference types="mongoose" />
import { UsersService } from './users.service';
import { TokensService } from './tokens.service';
export declare class AuthService {
    private userService;
    private tokenService;
    constructor(userService: UsersService, tokenService: TokensService);
    login(requestBody: any): Promise<any>;
    encryptPassword(password: any): Promise<any>;
    isValidAuthToken(token: any): Promise<any>;
    getUserById(id: any): import("mongoose").DocumentQuery<any, any, {}>;
}
