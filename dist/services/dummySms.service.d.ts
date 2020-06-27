export declare class DummySmsService {
    constructor();
    sendMessage({ body, to }: {
        body: any;
        to: any;
    }): Promise<void>;
}
