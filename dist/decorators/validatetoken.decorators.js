"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateToken = void 0;
const common_1 = require("@nestjs/common");
const jwttokenauth_guard_1 = require("../passport/jwttokenauth.guard");
function ValidateToken() {
    return common_1.applyDecorators(common_1.UseGuards(jwttokenauth_guard_1.JwtTokenAuthGuard));
}
exports.ValidateToken = ValidateToken;
//# sourceMappingURL=validatetoken.decorators.js.map