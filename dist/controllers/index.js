"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("./users.controller");
const classes_controller_1 = require("./classes.controller");
const assets_controller_1 = require("./assets.controller");
const auth_controller_1 = require("./auth.controller");
const chapters_controller_1 = require("./chapters.controller");
const subject_controller_1 = require("./subject.controller");
const payments_controller_1 = require("./payments.controller");
const teachers_controller_1 = require("./teachers.controller");
const products_controller_1 = require("./products.controller");
const students_controller_1 = require("./students.controller");
const test_controller_1 = require("./test.controller");
const leave_controller_1 = require("./leave.controller");
exports.default = [
    users_controller_1.UsersController,
    classes_controller_1.ClassesController,
    assets_controller_1.AssetsController,
    auth_controller_1.AuthController,
    chapters_controller_1.ChaptersController,
    subject_controller_1.SubjectsController,
    payments_controller_1.PaymentsController,
    teachers_controller_1.TeachersController,
    products_controller_1.ProductsController,
    students_controller_1.StudentsController,
    test_controller_1.TestController,
    leave_controller_1.LeaveController,
];
//# sourceMappingURL=index.js.map