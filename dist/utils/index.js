"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.success = void 0;
exports.success = async (message = 'Success', data) => {
    return ({
        message,
        data: await data,
    });
};
exports.generateOTP = () => Math.floor(1000 + Math.random() * 9000);
//# sourceMappingURL=index.js.map