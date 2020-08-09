import { Controller, Post, Body, } from '@nestjs/common';
import { LoginService } from 'src/services/login.service';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';

@Controller('login')
export class LoginController extends ResourceController {
  constructor(service: LoginService) {
    super(service)
  }
  @Post()
  createResource(@Body() createObject) {
    return success('Resource created successfully!', this.service.create(createObject));
  }

}