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
const login_service_1 = require("./login.service");
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
    login_service_1.LoginService
];
//# sourceMappingURL=index.js.map