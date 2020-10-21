import { Model } from 'mongoose';
import { DBService } from './db.service';
import { CoursesService } from 'src/services/courses.service';
import { LiveStreamsService } from './liveStreams.service';
export declare class ProductsService extends DBService {
    private coursesService;
    private liveStreamsService;
    constructor(model: Model<any>, coursesService: CoursesService, liveStreamsService: LiveStreamsService);
    findAll(): import("mongoose").DocumentQuery<any[], any, {}>;
    findById(id: any): import("mongoose").DocumentQuery<any, any, {}>;
    createProduct(body: any, userId: any): Promise<any>;
    addCourse(requestBody: any): Promise<any>;
    liveStream(requestBody: any): Promise<any>;
}
