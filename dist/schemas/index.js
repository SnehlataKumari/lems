"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const class_schema_1 = require("./class.schema");
const asset_schema_1 = require("./asset.schema");
const chapter_schema_1 = require("./chapter.schema");
const subject_schema_1 = require("./subject.schema");
const version_schema_1 = require("./version.schema");
const token_schema_1 = require("./token.schema");
const teacher_schema_1 = require("./teacher.schema");
const product_schema_1 = require("./product.schema");
const course_schema_1 = require("./course.schema");
const liveStream_schema_1 = require("./liveStream.schema");
const student_schema_1 = require("./student.schema");
const test_schema_1 = require("./test.schema");
const socialLogin_schema_1 = require("./socialLogin.schema");
const otp_schema_1 = require("./otp.schema");
exports.default = [
    { name: 'Class', schema: class_schema_1.ClassSchema },
    { name: 'User', schema: user_schema_1.UserSchema },
    { name: 'Asset', schema: asset_schema_1.AssetSchema },
    { name: 'Chapter', schema: chapter_schema_1.ChapterSchema },
    { name: 'Subject', schema: subject_schema_1.SubjectSchema },
    { name: 'Version', schema: version_schema_1.VersionSchema },
    { name: 'Token', schema: token_schema_1.TokenSchema },
    { name: 'Teacher', schema: teacher_schema_1.TeacherSchema },
    { name: 'Product', schema: product_schema_1.ProductSchema },
    { name: 'Course', schema: course_schema_1.CourseSchema },
    { name: 'LiveStream', schema: liveStream_schema_1.LiveStreamSchema },
    { name: 'Student', schema: student_schema_1.StudentSchema },
    { name: 'Test', schema: test_schema_1.TestSchema },
    { name: 'SocialLogin', schema: socialLogin_schema_1.SocialLoginSchema },
    { name: 'Otp', schema: otp_schema_1.OtpSchema },
];
//# sourceMappingURL=index.js.map