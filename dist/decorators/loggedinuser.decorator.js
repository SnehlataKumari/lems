"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedInUser = void 0;
const common_1 = require("@nestjs/common");
exports.LoggedInUser = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=loggedinuser.decorator.js.map