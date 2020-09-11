import { ResourceController } from './resource.controller';
import { ProductsService } from '../services/products.service';
export declare class ProductsController extends ResourceController {
    constructor(service: ProductsService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
    addProduct(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    addCourse(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    liveStreamDetails(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
}
