import { LiveClassService } from 'src/services/liveClass.service';
import { ResourceController } from './resource.controller';
export declare class LiveClassController extends ResourceController {
    service: LiveClassService;
    constructor(service: LiveClassService);
    createLiveClass(request: any): Promise<{
        message: string;
        data: any;
    }>;
    validateStreamCode({ streamCode }: {
        streamCode: any;
    }): Promise<boolean>;
    getAllLiveClassesByTeacherId(request: any): Promise<{
        message: string;
        data: any;
    }>;
    acceptLiveClasssRequest(id: any): Promise<{
        message: string;
        data: any;
    }>;
    rejectLiveClassRequest(id: any, rejectionReason: any): Promise<{
        message: string;
        data: any;
    }>;
    getResource(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
