import { ConfigService } from "@nestjs/config";
export declare class SmsService {
    private config;
    twilioAccountSid: any;
    twilioAuthToken: any;
    client: any;
    constructor(config: ConfigService);
    sendMessage({ body, to }: {
        body: any;
        to: any;
    }): Promise<any>;
    sendOtp(user: any): Promise<any>;
}
