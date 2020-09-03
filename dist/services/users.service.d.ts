import { Model } from 'mongoose';
import { DBService } from './db.service';
export declare class UsersService extends DBService {
    constructor(model: Model<any>);
    findByEmail(email: any): import("mongoose").DocumentQuery<any, any, {}>;
    validatePassword(password: any): Promise<void>;
}
