"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = require("./users.service");
const videos_service_1 = require("./videos.service");
const classes_service_1 = require("./classes.service");
const file_service_1 = require("./file.service");
const auth_service_1 = require("./auth.service");
const s3_service_1 = require("./s3.service");
exports.default = [
    users_service_1.UsersService,
    videos_service_1.VideosService,
    classes_service_1.ClassesService,
    file_service_1.FileService,
    auth_service_1.AuthService,
    s3_service_1.S3Service
];
//# sourceMappingURL=index.js.map