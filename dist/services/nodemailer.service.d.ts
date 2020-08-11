import { ConfigService } from "@nestjs/config";
export declare class NodeMailerService {
    private config;
    mailTransporter: any;
    constructor(config: ConfigService);
    sendEmail(to: any, subject: any, text: any): Promise<void>;
}
