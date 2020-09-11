import { Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { success } from 'src/utils';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';

export class ResourceController {
  constructor(public service) {}

  @ValidateToken()
  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @ValidateToken()
  @Post()
  createResource(@Body() createObject) {
    return success(
      'Resource created successfully!',
      this.service.create(createObject),
    );
  }

  @ValidateToken()
  @Delete('/:id')
  async deleteResource(@Param('id') id) {
    await this.service.findByIdAndDelete(id);
    return success('Resource deleted successfully!', {
      id,
    });
  }

  @ValidateToken()
  @Put('/:id')
  async updateResource(@Param('id') id, @Body() resourceObject) {
    return success(
      'Resource updated successfully!',
      this.service.findByIdAndUpdate(id, resourceObject),
    );
  }

  @ValidateToken()
  @Get('/:id')
  async getResource(@Param('id') id) {
    return success(
      'Resource updated successfully!',
      this.service.findById(id),
    );
  }
}
