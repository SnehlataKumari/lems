"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_pipe_1 = require("./validation.pipe");
const joivalidation_pipe_1 = require("./joivalidation.pipe");
exports.default = [
    validation_pipe_1.ValidationPipe,
    joivalidation_pipe_1.JoiValidationPipe
];
//# sourceMappingURL=index.js.map