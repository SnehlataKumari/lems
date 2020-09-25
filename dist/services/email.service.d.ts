import { NodeMailerService } from './nodemailer.service';
export declare class EmailService {
    private nodeMailerService;
    constructor(nodeMailerService: NodeMailerService);
    sendEmail(to: any, subject: any, text: any): Promise<void>;
    gettemplatePaths(templateName: any): string;
    getFileData(templateName: any): string;
    getHandlebarTemplate(templateName: any): HandlebarsTemplateDelegate<any>;
    getTemlateVerificationLinkTemplate(user: any, link: any): string;
    getTemlateResetPasswordLinkTemplate(user: any, link: any): string;
    getTemplate(templateName: any, obj: any): string;
    sendVerificationLink(user: any, link: any): Promise<void>;
    sendResetPasswordLink(user: any, link: any): Promise<void>;
    sendUpdatedPasswordNotification(userModel: any, currentPassword: any, link: any): Promise<void>;
    sendRegistrationAccepted(userModel: any, { password, hostUrl }: {
        password: any;
        hostUrl: any;
    }): Promise<void>;
    sendRegistrationRejected(userModel: any): Promise<void>;
    sendOtp(userModel: any): Promise<void>;
    sendOtpToEmail(email: any, otp: any): Promise<void>;
}
