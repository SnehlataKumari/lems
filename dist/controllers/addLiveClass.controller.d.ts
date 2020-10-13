import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/services/auth.service';
import { TokensService } from 'src/services/tokens.service';
import { ResourceController } from './resource.controller';
export declare class LiveClassController extends ResourceController {
    private config;
    private tokenService;
    service: AuthService;
    constructor(config: ConfigService, tokenService: TokensService, service: AuthService);
    get hostUrl(): any;
    addLiveClass(requestBody: any): Promise<void>;
}
