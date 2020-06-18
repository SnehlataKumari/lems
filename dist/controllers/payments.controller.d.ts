import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';
export declare class PaymentsController extends ResourceController {
    constructor(service: UsersService);
    createPayment(req: any): Promise<{
        message: string;
        data: any;
    }>;
}
