"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONSTANTS = exports.USER_ROLES = exports.getKeys = void 0;
exports.getKeys = constant => Reflect.ownKeys(constant).map(constantKey => constant[constantKey].key);
exports.USER_ROLES = {
    USER: { key: 'USER', label: 'User' },
    ADMIN: { key: 'ADMIN', label: 'Admin' },
};
exports.JWT_CONSTANTS = {
    secret: process.env.SECRET || 'dontcare',
    expiresIn: '60s',
};
//# sourceMappingURL=index.js.map