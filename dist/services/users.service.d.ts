import { Model } from 'mongoose';
import { DBService } from './db.service';
export declare class UsersService extends DBService {
    constructor(model: Model<any>);
    findByEmail(email: any): import("mongoose").DocumentQuery<any, any, {}>;
    publicKeys: string[];
    getPublicDetails(user: any): any;
    passwordExpression: RegExp;
    schema: any;
    validateUsers(name: any, email: any, password: any): Promise<void>;
    validatePassword(password: any): Promise<void>;
}
