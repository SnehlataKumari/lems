import { Model } from 'mongoose';
import { pick } from 'lodash';

export abstract class DBService {
  constructor(private model: Model<any>) {}

  getModel() {
    return this.model;
  }

  // TODO: Make it abstract
  publicKeys = ['_id'];

  getPublicDetails(user) {
    return pick(user, this.publicKeys);
  }

  findAll(where = {}) {
    return this.model.find(where);
  }

  create(userObject) {
    return this.model.create(userObject);
  }

  findByIdAndDelete(userId) {
    return this.model.findByIdAndDelete(userId);
  }

  findByIdAndUpdate(userId, userObject, options = { new: true }) {
    return this.model.findByIdAndUpdate(userId, userObject, options);
  }

  findById(id) {
    return this.model.findById(id);
  }

  findOne(query) {
    return this.model.findOne(query);
  }

  findOneAndDelete(query = {}) {
    return this.model.findOneAndDelete(query);
  }

  find(query = {}) {
    return this.model.find(query);
  }

  update(model, updateObject) {
    return this.findByIdAndUpdate(model._id, updateObject);
  }

  delete( query ){
    return this.model.remove( query );
  }
}
