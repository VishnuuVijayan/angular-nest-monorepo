import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';
import mongoose from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('v1')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('v1')
  getProducts(@Query('page') page = 1, @Query('perPage') perPage = 5) {
    return this.productService.getProducts(page, perPage);
  }

  @Get('v1/:id')
  async getProductById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    const findProduct =
      isValid && (await this.productService.getProductById(id));
    if (!findProduct || !isValid)
      throw new HttpException('Product not found', 404);
    return findProduct;
  }

  @Put('v1/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    const updatedProduct =
      isValid &&
      (await this.productService.updateProduct(id, updateProductDto));
    if (!updatedProduct || !isValid)
      throw new HttpException('Product Not Found', 404);
    return updatedProduct;
  }

  @Delete('v1/:id')
  async deleteProduct(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    const deletedProduct =
      isValid && (await this.productService.deleteProduct(id));
    if (!isValid || !deletedProduct)
      throw new HttpException('Product not found', 404);
    return;
  }
}
