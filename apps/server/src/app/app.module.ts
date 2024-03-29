import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
