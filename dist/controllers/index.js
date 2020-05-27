"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("./users.controller");
const classes_controller_1 = require("./classes.controller");
const videos_controller_1 = require("./videos.controller");
const auth_controller_1 = require("./auth.controller");
exports.default = [
    users_controller_1.UsersController,
    classes_controller_1.ClassesController,
    videos_controller_1.VideosController,
    auth_controller_1.AuthController
];
//# sourceMappingURL=index.js.map