import { ResourceController } from './resource.controller';
import { TestService } from 'src/services/test.service';
export declare class TestController extends ResourceController {
    constructor(service: TestService);
    getTestById(testId: any): Promise<{
        message: string;
        data: any;
    }>;
}
