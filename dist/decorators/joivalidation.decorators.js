"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidation = void 0;
const common_1 = require("@nestjs/common");
const joivalidation_pipe_1 = require("../pipes/joivalidation.pipe");
function JoiValidation(schema) {
    return common_1.applyDecorators(common_1.UsePipes(new joivalidation_pipe_1.JoiValidationPipe(schema)));
}
exports.JoiValidation = JoiValidation;
//# sourceMappingURL=joivalidation.decorators.js.map