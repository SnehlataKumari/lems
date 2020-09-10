"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = require("./users.service");
const assets_service_1 = require("./assets.service");
const classes_service_1 = require("./classes.service");
const file_service_1 = require("./file.service");
const auth_service_1 = require("./auth.service");
const s3_service_1 = require("./s3.service");
const sms_service_1 = require("./sms.service");
const chapters_service_1 = require("./chapters.service");
const subject_service_1 = require("./subject.service");
const version_service_1 = require("./version.service");
const dummySms_service_1 = require("./dummySms.service");
const tokens_service_1 = require("./tokens.service");
const email_service_1 = require("./email.service");
const nodemailer_service_1 = require("./nodemailer.service");
const teachers_service_1 = require("./teachers.service");
const products_service_1 = require("./products.service");
const courses_service_1 = require("./courses.service");
const liveStreams_service_1 = require("./liveStreams.service");
const dbtransaction_service_1 = require("./dbtransaction.service");
const students_service_1 = require("./students.service");
exports.default = [
    users_service_1.UsersService,
    assets_service_1.AssetsService,
    classes_service_1.ClassesService,
    file_service_1.FileService,
    auth_service_1.AuthService,
    s3_service_1.S3Service,
    sms_service_1.SmsService,
    classes_service_1.ClassesService,
    chapters_service_1.ChaptersService,
    subject_service_1.SubjectsService,
    version_service_1.VersionService,
    dummySms_service_1.DummySmsService,
    tokens_service_1.TokensService,
    nodemailer_service_1.NodeMailerService,
    email_service_1.EmailService,
    teachers_service_1.TeachersService,
    products_service_1.ProductsService,
    courses_service_1.CoursesService,
    liveStreams_service_1.LiveStreamsService,
    dbtransaction_service_1.DBTransactionService,
    students_service_1.StudentsService
];
//# sourceMappingURL=index.js.map