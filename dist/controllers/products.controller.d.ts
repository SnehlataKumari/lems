import { ResourceController } from './resource.controller';
import { ProductsService } from '../services/products.service';
export declare class ProductsController extends ResourceController {
    constructor(service: ProductsService);
    findAll(): Promise<{
        message: string;
        data: any;
    }>;
    getTestById(testId: any): Promise<{
        message: string;
        data: any;
    }>;
    createProduct(request: any): Promise<{
        message: string;
        data: any;
    }>;
    validateStreamCode({ productCode }: {
        productCode: any;
    }): Promise<boolean>;
    addCourse(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
    liveStreamDetails(requestBody: any): Promise<{
        message: string;
        data: any;
    }>;
}
