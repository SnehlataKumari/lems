import { Model } from 'mongoose';
import { DBService } from './db.service';
import { SmsService } from './sms.service';
import { EmailService } from './email.service';
export declare class OtpService extends DBService {
    private smsService;
    private emailService;
    constructor(model: Model<any>, smsService: SmsService, emailService: EmailService);
    sendOtpToMobile(phone: any, otp: any): Promise<void>;
    sendOtpToEmail(email: any, otp: any): Promise<void>;
    generateOtp(): string;
}
