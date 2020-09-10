import { ResourceController } from './resource.controller';
import { UsersService } from 'src/services/users.service';
import { StudentsService } from 'src/services/students.service';
export declare class StudentsController extends ResourceController {
    private userService;
    constructor(service: StudentsService, userService: UsersService);
    getTeacherDetails(req: any): Promise<{
        message: string;
        data: any;
    }>;
}
