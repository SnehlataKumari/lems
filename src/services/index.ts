import { UsersService } from './users.service';
import { AssetsService } from './assets.service';
import { ClassesService } from './classes.service';
import { FileService } from './file.service';
import { AuthService } from './auth.service';
import { S3Service } from './s3.service';
import { SmsService } from './sms.service';
import { ChaptersService } from './chapters.service';
import { SubjectsService } from './subject.service';
import { VersionService } from './version.service';
// import { TwillioService } from "./twillio.service";
import { DummySmsService } from './dummySms.service';
import { TokensService } from './tokens.service';
import { EmailService } from './email.service';
import { NodeMailerService } from './nodemailer.service';

export default [
  UsersService,
  AssetsService,
  ClassesService,
  FileService,
  AuthService,
  S3Service,
  SmsService,
  ClassesService,
  ChaptersService,
  SubjectsService,
  VersionService,
  // TwillioService,
  DummySmsService,
  TokensService,
  NodeMailerService,
  EmailService,
];
