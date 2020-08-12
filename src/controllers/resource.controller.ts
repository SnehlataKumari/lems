import { Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { success } from 'src/utils';
import { JwtAuthGuard } from 'src/passport/jwtauth.guard';

export class ResourceController {
  constructor(public service) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createResource(@Body() createObject) {
    return success(
      'Resource created successfully!',
      this.service.create(createObject),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteResource(@Param('id') id) {
    await this.service.findByIdAndDelete(id);
    return success('Resource deleted successfully!', {
      id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateResource(@Param('id') id, @Body() resourceObject) {
    return success(
      'Resource updated successfully!',
      this.service.findByIdAndUpdate(id, resourceObject),
    );
  }
}
