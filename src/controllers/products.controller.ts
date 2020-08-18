import { Controller, Post, Body, Get, } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController extends ResourceController {
  constructor(
    service: ProductsService,
  ) {
    super(service);
  }

  @Get()
  findAll() {
    return success('List found successfully', this.service.findAll());
  }

  @Post('add-product')
  async addProduct(@Body() requestBody) {
    const product = await this.service.addProduct(requestBody);
    return success('product created successfully', { product });
  }

  @Post('add-course')
  async addCourse(@Body() requestBody) {
    const course = await this.service.addCourse(requestBody);
    return success(' course added successfully', { course })
  }

  @Post('add-live-stream-details')
  async liveStreamDetails(@Body() requestBody) {
    const liveStream = await this.service.liveStream(requestBody);
    return success('live stream details', {liveStream});
  }


}