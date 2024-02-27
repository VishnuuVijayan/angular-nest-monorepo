import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNotEmpty()
  @IsString()
  price: string;
}
