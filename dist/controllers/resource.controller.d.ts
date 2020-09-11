export declare class ResourceController {
    service: any;
    constructor(service: any);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
    createResource(createObject: any): Promise<{
        message: string;
        data: any;
    }>;
    deleteResource(id: any): Promise<{
        message: string;
        data: any;
    }>;
    updateResource(id: any, resourceObject: any): Promise<{
        message: string;
        data: any;
    }>;
    getResource(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
