import { LiveClassService } from 'src/services/liveClass.service';
import { ResourceController } from './resource.controller';
export declare class LiveClassController extends ResourceController {
    service: LiveClassService;
    constructor(service: LiveClassService);
    getLiveClassCreatedByTeacher(): Promise<{
        message: string;
        data: any;
    }>;
    getAllLiveClasses(): Promise<{
        message: string;
        data: any;
    }>;
    getLiveClassCreatedByAdmin(): Promise<{
        message: string;
        data: any;
    }>;
    getLiveDemoClasses(): Promise<{
        message: string;
        data: any;
    }>;
    deleteLiveClassById(liveClassId: any): Promise<{
        message: string;
        data: any;
    }>;
    createLiveClass(request: any): Promise<{
        message: string;
        data: any;
    }>;
    createLiveClassByAdmin(request: any): Promise<{
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
    getLiveClassAttendDetail(id: any): Promise<{
        message: string;
        data: any;
    }>;
    getResource(id: any): Promise<{
        message: string;
        data: any;
    }>;
}
