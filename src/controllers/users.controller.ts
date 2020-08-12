import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';

@Controller('users')
export class UsersController extends ResourceController {
  constructor(service: UsersService) {
    super(service);
  }

  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }
}
