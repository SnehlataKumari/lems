import { Controller, Post, Body, Get, Req, Param } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { success } from 'src/utils';
import { ProductsService } from '../services/products.service';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';

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

  @Get(':productId')
  async getTestById(@Param('productId') testId) {
    const productModel = await this.service.findById(testId);
    return success('Product found!', this.service.getPublicDetails(productModel));
  }

  // @ValidateToken()
  // @Post('add-product')
  // async addProduct(@Body() requestBody) {
  //   const product = await this.service.addProduct(requestBody);
  //   return success('product created successfully', { product });
  // }

  @ValidateToken()
  @Post()
  async createProduct(@Req() request) {
    const body = request.body;
    const userId = request.user._id;
    return success(
      'Product Created Successfully',
      await this.service.createProduct(body, userId),
    );
  };

  @Post('/validate-product-code')
  async validateStreamCode(@Body() { productCode }) {
    const product = await this.service.findOne({ productCode: productCode });
    if (product === null) {
      return true;
    }
    return false;
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