import { Model } from "mongoose";

export class DBService {
  constructor(private model: Model<any>) {

  }

  async findAll() {
    return this.model.find();
  }

  async create(userObject) {
    return this.model.create(userObject);
  }

  async findByIdAndDelete(userId) {
    return this.model.findByIdAndDelete(userId);
  }

  async findByIdAndUpdate(userId, userObject, options = { new: true }) {
    return this.model.findByIdAndUpdate(userId, userObject, options);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(query) {
    return this.model.findOne(query);
  }


  async update(model, updateObject) {
    return this.findByIdAndUpdate(model._id, updateObject);
  }
}