import { Model } from "mongoose";
export declare class DBService {
    private model;
    constructor(model: Model<any>);
    findAll(where?: {}): import("mongoose").DocumentQuery<any[], any, {}>;
    create(userObject: any): Promise<any>;
    findByIdAndDelete(userId: any): import("mongoose").DocumentQuery<any, any, {}>;
    findByIdAndUpdate(userId: any, userObject: any, options?: {
        new: boolean;
    }): import("mongoose").DocumentQuery<any, any, {}>;
    findById(id: any): import("mongoose").DocumentQuery<any, any, {}>;
    findOne(query: any): import("mongoose").DocumentQuery<any, any, {}>;
    update(model: any, updateObject: any): Promise<any>;
}
