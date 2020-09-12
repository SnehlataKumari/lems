import { ResourceController } from './resource.controller';
import { TestService } from 'src/services/test.service';
import { TeachersService } from 'src/services/teachers.service';
export declare class TestController extends ResourceController {
    private teacherService;
    constructor(service: TestService, teacherService: TeachersService);
    createTest(createObject: any, req: any): Promise<{
        message: string;
        data: any;
    }>;
    findAllTests(req: any): Promise<{
        message: string;
        data: any;
    }>;
    getTestById(testId: any): Promise<{
        message: string;
        data: any;
    }>;
}
