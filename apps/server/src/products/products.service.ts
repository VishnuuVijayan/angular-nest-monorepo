import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/Product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  createProduct(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async getProducts(page: number, perPage: number) {
    if (page <= 0 || perPage <= 0) {
      throw new HttpException('Invalid page or perPage values', 400);
    }

    const skip = (page - 1) * perPage;

    const items = await this.productModel
      .find()
      .skip(skip)
      .limit(perPage)
      .exec();

    const total = await this.productModel.countDocuments();

    const totalPages = Math.ceil(total / perPage);

    if (page > totalPages) {
      throw new Error('Requested page exceeds total number of pages');
    }

    return {
      items,
      total,
      page,
      perPage,
      totalPages,
    };
  }

  getProductById(id: string) {
    return this.productModel.findById(id);
  }

  updateProduct(id: string, updateProductDto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
