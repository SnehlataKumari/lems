import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';
export declare class UsersController extends ResourceController {
    constructor(service: UsersService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
}
