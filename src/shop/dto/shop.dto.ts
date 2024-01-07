import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchShopDto {
  @IsString()
  search: string;

  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @Type(() => Number)
  page: number;
}

export class ListCatalougeDto {
  @IsString()
  search: string;

  @IsString()
  @IsOptional()
  shopId: string;

  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @Type(() => Number)
  page: number;
}

export class CreateCatalougeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsBoolean()
  isOutofStock: boolean;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  @IsOptional()
  shopId: string;
}

export class UpdateCatalougeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsBoolean()
  isOutofStock: boolean;

  @IsArray()
  images: object[];

  @IsString()
  @IsOptional()
  shopId: string;

  @IsString()
  @IsOptional()
  catalougeId: string;
}

export class DeleteCatalougeDto {
  @IsString()
  @IsOptional()
  shopId: string;

  @IsString()
  @IsOptional()
  catalougeId: string;
}

export class AddImageToCatalougeDto {
  @IsString()
  @IsOptional()
  shopId: string;

  @IsString()
  @IsOptional()
  catalougeId: string;

  @IsString()
  image: string;
}

export class RemoveImageToCatalougeDto {
  @IsString()
  shopId: string;

  @IsString()
  catalougeId: string;

  @IsString()
  imageId: string;
}
