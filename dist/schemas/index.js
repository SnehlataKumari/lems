"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const class_schema_1 = require("./class.schema");
const asset_schema_1 = require("./asset.schema");
const chapter_schema_1 = require("./chapter.schema");
const subject_schema_1 = require("./subject.schema");
exports.default = [
    { name: 'Class', schema: class_schema_1.ClassSchema },
    { name: 'User', schema: user_schema_1.UserSchema },
    { name: 'Asset', schema: asset_schema_1.AssetSchema },
    { name: 'Chapter', schema: chapter_schema_1.ChapterSchema },
    { name: 'Subject', schema: subject_schema_1.SubjectSchema }
];
//# sourceMappingURL=index.js.map