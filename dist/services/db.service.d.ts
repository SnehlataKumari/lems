import { Model } from "mongoose";
export declare class DBService {
    private model;
    constructor(model: Model<any>);
    findAll(): Promise<any[]>;
    create(userObject: any): Promise<any>;
    findByIdAndDelete(userId: any): Promise<any>;
    findByIdAndUpdate(userId: any, userObject: any, options?: {
        new: boolean;
    }): Promise<any>;
    findById(id: any): Promise<any>;
    findOne(query: any): Promise<any>;
    update(model: any, updateObject: any): Promise<any>;
}
