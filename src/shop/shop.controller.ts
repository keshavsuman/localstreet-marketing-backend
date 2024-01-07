import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import {
  CreateCatalougeDto,
  ListCatalougeDto,
  SearchShopDto,
  UpdateCatalougeDto,
} from './dto/shop.dto';
import { ResponseHandlerService } from 'src/helper/response-helper.service';

@Controller('shop')
export class ShopController {
  constructor(
    private readonly responseHandlerService: ResponseHandlerService,
    private readonly shopService: ShopService,
  ) {}

  @Get()
  async searchShop(@Query() searchShopDto: SearchShopDto) {
    try {
      const data = await this.shopService.searchShop(searchShopDto);
      return this.responseHandlerService.response(
        null,
        HttpStatus.OK,
        'Shops fetched successfully',
        data,
      );
    } catch (error) {}
  }

  @Get('/catalouges/:shopId')
  async listCatalouges(
    @Param('shopId') shopId: string,
    @Query() listCatalougeDto: ListCatalougeDto,
  ) {
    try {
      const data = await this.shopService.listCatalouges({
        ...listCatalougeDto,
        shopId,
      });
      return this.responseHandlerService.response(
        null,
        HttpStatus.OK,
        'Catalouges fetched sucesfully',
        data,
      );
    } catch (error) {
      return this.responseHandlerService.response(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null,
      );
    }
  }

  @Post('/catalouges/:shopId')
  async createCatalouge(
    @Body() createCatalougeDto: CreateCatalougeDto,
    @Param('shopId') shopId: string,
  ) {
    try {
      const data = await this.shopService.createCatalouge({
        ...createCatalougeDto,
        shopId,
      });
      return this.responseHandlerService.response(
        null,
        HttpStatus.OK,
        'Catalouge created sucesfully',
        data,
      );
    } catch (error) {
      return this.responseHandlerService.response(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null,
      );
    }
  }

  @Put('/catalouges/:shopId/:catalougeId')
  async updateCatalouge(
    @Body() updateCatalougeDto: UpdateCatalougeDto,
    @Param('shopId') shopId: string,
    @Param('catalougeId') catalougeId: string,
  ) {
    try {
      const data = await this.shopService.updateCatalouge({
        ...updateCatalougeDto,
        shopId,
        catalougeId,
      });
      return this.responseHandlerService.response(
        null,
        HttpStatus.OK,
        'Catalouge updated sucesfully',
        data,
      );
    } catch (error) {
      return this.responseHandlerService.response(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null,
      );
    }
  }

  @Delete('/catalouges/:shopId/:catalougeId')
  async deleteCatalouge(
    @Param('shopId') shopId: string,
    @Param('catalougeId') catalougeId: string,
  ) {
    try {
      const data = await this.shopService.deleteCatalouge({
        shopId,
        catalougeId,
      });
      return this.responseHandlerService.response(
        null,
        HttpStatus.OK,
        'Catalouge Deleted sucesfully',
        data,
      );
    } catch (error) {
      return this.responseHandlerService.response(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null,
      );
    }
  }
}
