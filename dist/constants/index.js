"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONSTANTS = exports.USER_ROLES = exports.TOKEN_TYPES = exports.getKeys = void 0;
exports.getKeys = constant => Reflect.ownKeys(constant).map(constantKey => constant[constantKey].key);
exports.TOKEN_TYPES = {
    LOGIN: { key: 'LOGIN', label: 'LOGIN' },
    VERIFY_EMAIL: { key: 'VERIFY_EMAIL', label: 'VERIFY_EMAIL' },
    FORGOT_PASSWORD: { key: 'FORGOT_PASSWORD', label: 'FORGOT_PASSWORD' },
};
exports.USER_ROLES = {
    TEACHER: { key: 'TEACHER', label: 'Teacher' },
    STUDENT: { key: 'STUDENT', label: 'Student' },
    ADMIN: { key: 'ADMIN', label: 'Admin' },
};
exports.JWT_CONSTANTS = {
    secret: process.env.SECRET || 'dontcare',
    expiresIn: '60s',
};
//# sourceMappingURL=index.js.map