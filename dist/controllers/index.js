"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("./users.controller");
const classes_controller_1 = require("./classes.controller");
const assets_controller_1 = require("./assets.controller");
const auth_controller_1 = require("./auth.controller");
const chapters_controller_1 = require("./chapters.controller");
const subject_controller_1 = require("./subject.controller");
const payments_controller_1 = require("./payments.controller");
exports.default = [
    users_controller_1.UsersController,
    classes_controller_1.ClassesController,
    assets_controller_1.AssetsController,
    auth_controller_1.AuthController,
    chapters_controller_1.ChaptersController,
    subject_controller_1.SubjectsController,
    payments_controller_1.PaymentsController
];
//# sourceMappingURL=index.js.map