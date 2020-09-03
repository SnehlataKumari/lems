"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
const lodash_1 = require("lodash");
class DBService {
    constructor(model) {
        this.model = model;
        this.publicKeys = [];
    }
    getModel() {
        return this.model;
    }
    getPublicDetails(model) {
        const obj = model.toJSON();
        if (this.publicKeys.length === 0) {
            return obj;
        }
        return lodash_1.pick(obj, this.publicKeys);
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
    delete(query) {
        return this.model.remove(query);
    }
}
exports.DBService = DBService;
//# sourceMappingURL=db.service.js.map