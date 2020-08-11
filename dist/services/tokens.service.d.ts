import { Model } from 'mongoose';
import { DBService } from './db.service';
export declare class TokensService extends DBService {
    constructor(model: Model<any>);
    findByTokenAndTypeAndDelete(token: any, type: any): import("mongoose").DocumentQuery<any, any, {}>;
    findByTokenAndType(token: any, type: any): import("mongoose").DocumentQuery<any, any, {}>;
}
