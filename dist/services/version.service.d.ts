import { Model } from 'mongoose';
import { DBService } from './db.service';
export declare class VersionService extends DBService {
    constructor(model: Model<any>);
}
