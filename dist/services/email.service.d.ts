import { NodeMailerService } from './nodemailer.service';
export declare class EmailService {
    private nodeMailerService;
    constructor(nodeMailerService: NodeMailerService);
    sendEmail(to: any, subject: any, text: any): Promise<void>;
    gettemplatePaths(templateName: any): string;
    getFileData(templateName: any): string;
    getHandlebarTemplate(templateName: any): any;
    getTemlateVerificationLinkTemplate(user: any, link: any): any;
    getTemlateResetPasswordLinkTemplate(user: any, link: any): any;
    sendVerificationLink(user: any, link: any): Promise<void>;
    sendResetPasswordLink(user: any, link: any): Promise<void>;
    sendUpdatedPasswordNotification(userModel: any, currentPassword: any, link: any): Promise<void>;
}
