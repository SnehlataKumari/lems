import { ResourceController } from './resource.controller';
import { LeaveService } from 'src/services/leave.service';
import { TeachersService } from 'src/services/teachers.service';
export declare class LeaveController extends ResourceController {
    private teacherService;
    constructor(service: LeaveService, teacherService: TeachersService);
    createLeave(createObject: any, req: any): Promise<{
        message: string;
        data: any;
    }>;
}
