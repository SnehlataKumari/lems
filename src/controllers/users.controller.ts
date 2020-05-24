import { Controller,  } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';

@Controller('users')
export class UsersController extends ResourceController {
  constructor(service: UsersService) {
    super(service)
  }
}