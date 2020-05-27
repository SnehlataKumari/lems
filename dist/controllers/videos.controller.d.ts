import { ResourceController } from './resource.controller';
import { VideosService } from 'src/services/videos.service';
export declare class VideosController extends ResourceController {
    constructor(service: VideosService);
    createVideo(createObject: any, file: any): Promise<{
        message: string;
        data: any;
    }>;
    updateVideo(id: any, createObject: any, file: any): Promise<{
        message: string;
        data: any;
    }>;
}
