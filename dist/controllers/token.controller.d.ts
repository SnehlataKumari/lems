import { TokensService } from 'src/services/tokens.service';
import { ResourceController } from './resource.controller';
export declare class TokensController extends ResourceController {
    constructor(service: TokensService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
}
