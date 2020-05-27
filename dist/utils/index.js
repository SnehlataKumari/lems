"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.success = void 0;
exports.success = async (message = 'Success', data) => {
    return ({
        message,
        data: await data,
    });
};
exports.generateOTP = () => 1234;
//# sourceMappingURL=index.js.map