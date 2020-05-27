"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const class_schema_1 = require("./class.schema");
const video_schema_1 = require("./video.schema");
exports.default = [
    { name: 'Class', schema: class_schema_1.ClassSchema },
    { name: 'User', schema: user_schema_1.UserSchema },
    { name: 'Video', schema: video_schema_1.VideoSchema }
];
//# sourceMappingURL=index.js.map