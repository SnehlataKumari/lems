"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
class DBService {
    constructor(model) {
        this.model = model;
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
    find(query = {}) {
        return this.model.find(query);
    }
    async update(model, updateObject) {
        return this.findByIdAndUpdate(model._id, updateObject);
    }
}
exports.DBService = DBService;
//# sourceMappingURL=db.service.js.map