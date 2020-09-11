import { ConfigService } from '@nestjs/config';
import { DummySmsService } from './dummySms.service';
export declare class SmsService {
    private dummySmsService;
    private config;
    constructor(dummySmsService: DummySmsService, config: ConfigService);
    getClient(): any;
    sendMessage({ body, to }: {
        body: any;
        to: any;
    }): Promise<any>;
    sendOtp(user: any): Promise<any>;
}
