import { LoginService } from 'src/services/login.service';
import { ResourceController } from './resource.controller';
export declare class LoginController extends ResourceController {
    constructor(service: LoginService);
    createResource(createObject: any): Promise<{
        message: string;
        data: any;
    }>;
}
