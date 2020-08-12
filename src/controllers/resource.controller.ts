import { Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { success } from 'src/utils';
import { JwtTokenAuthGuard } from 'src/passport/jwttokenauth.guard';

export class ResourceController {
  constructor(public service) {}

  @UseGuards(JwtTokenAuthGuard)
  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @UseGuards(JwtTokenAuthGuard)
  @Post()
  createResource(@Body() createObject) {
    return success(
      'Resource created successfully!',
      this.service.create(createObject),
    );
  }

  @UseGuards(JwtTokenAuthGuard)
  @Delete('/:id')
  async deleteResource(@Param('id') id) {
    await this.service.findByIdAndDelete(id);
    return success('Resource deleted successfully!', {
      id,
    });
  }

  @UseGuards(JwtTokenAuthGuard)
  @Put('/:id')
  async updateResource(@Param('id') id, @Body() resourceObject) {
    return success(
      'Resource updated successfully!',
      this.service.findByIdAndUpdate(id, resourceObject),
    );
  }
}
