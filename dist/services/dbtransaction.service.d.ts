import { UsersService } from './users.service';
export declare class DBTransactionService {
    private userService;
    constructor(userService: UsersService);
    transaction(cb: any, options?: {}): Promise<any>;
}
