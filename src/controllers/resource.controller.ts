import { Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { success } from 'src/utils';

export class ResourceController {

  constructor(public service) {}

  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @Post()
  createResource(@Body() createObject) {
    return success('Resource created successfully!', this.service.create(createObject));
  }

  @Delete('/:id')
  async deleteResource(@Param('id') id) {
    await this.service.findByIdAndDelete(id);
    return success('Resource deleted successfully!', {
      id
    });
  }

  @Put('/:id')
  async updateResource(@Param('id') id, @Body() resourceObject) {
    return success('Resource updated successfully!', this.service.findByIdAndUpdate(id, resourceObject));
  }
};
