import { DBService } from './db.service';
import { Model } from 'mongoose';
export declare class TestService extends DBService {
    constructor(model: Model<any>);
}
