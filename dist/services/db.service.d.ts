import { Model } from 'mongoose';
export declare abstract class DBService {
    private model;
    constructor(model: Model<any>);
    getModel(): Model<any, {}>;
    publicKeys: any[];
    getPublicDetails(model: any): any;
    findAll(where?: {}): import("mongoose").DocumentQuery<any[], any, {}>;
    create(userObject: any): Promise<any>;
    findByIdAndDelete(userId: any): import("mongoose").DocumentQuery<any, any, {}>;
    findByIdAndUpdate(userId: any, userObject: any, options?: {
        new: boolean;
    }): import("mongoose").DocumentQuery<any, any, {}>;
    findById(id: any): import("mongoose").DocumentQuery<any, any, {}>;
    findOne(query: any): import("mongoose").DocumentQuery<any, any, {}>;
    findOneAndDelete(query?: {}): import("mongoose").DocumentQuery<any, any, {}>;
    find(query?: {}): import("mongoose").DocumentQuery<any[], any, {}>;
    update(model: any, updateObject: any): import("mongoose").DocumentQuery<any, any, {}>;
    delete(query: any): import("mongoose").Query<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    removeModel(model: any): any;
}
