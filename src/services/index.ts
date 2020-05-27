import { UsersService } from "./users.service";
import { VideosService } from "./videos.service";
import { ClassesService } from "./classes.service";
import { FileService } from "./file.service";
import { AuthService } from "./auth.service";
import { S3Service } from "./s3.service";

export default [
  UsersService,
  VideosService,
  ClassesService,
  FileService,
  AuthService,
  S3Service
];
