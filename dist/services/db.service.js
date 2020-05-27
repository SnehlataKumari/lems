"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
class DBService {
    constructor(model) {
        this.model = model;
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
exports.DBService = DBService;
//# sourceMappingURL=db.service.js.map