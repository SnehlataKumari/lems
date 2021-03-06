export declare const success: (message: string, data: any) => Promise<{
    message: string;
    data: any;
}>;
export declare const generateOTP: () => number;
export declare const isEmail: (emailOrMobile: any) => boolean;
export declare const isMobile: (emailOrMobile: any) => boolean;
export declare const getJsonFromDocument: (documentModel: any) => Promise<unknown>;
export declare const sanitizeJson: (json: any) => {};
export declare const removeSpecialChar: (stringVal: any) => any;
