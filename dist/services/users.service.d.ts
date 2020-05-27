import { Model } from 'mongoose';
import { DBService } from './db.service';
export declare class UsersService extends DBService {
    constructor(model: Model<any>);
    findByMobileNumber(mobileNumber: any): Promise<any>;
}
