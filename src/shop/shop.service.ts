import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatalougeDocument, Shop, ShopDoument } from './shop.schema';
import {
  AddImageToCatalougeDto,
  CreateCatalougeDto,
  DeleteCatalougeDto,
  ListCatalougeDto,
  RemoveImageToCatalougeDto,
  SearchShopDto,
  UpdateCatalougeDto,
} from './dto/shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('shop') private readonly shopModel: Model<ShopDoument>,
  ) {}

  async searchShop(searchShopDto: SearchShopDto): Promise<any> {
    const shop: Shop[] = await this.shopModel
      .find(
        {
          name: { $regex: searchShopDto.search, $options: 'i' },
        },
        {
          name: 1,
          address: 1,
          createdAt: 1,
          image: 1,
          updatedAt: 1,
        },
      )
      .limit(searchShopDto.limit)
      .skip((searchShopDto.page - 1) * searchShopDto.limit)
      .sort({ createdAt: -1 });
    return shop.map((shop) => {
      return shop.toJSON();
    });
  }

  async listCatalouges(
    listCatalougeDto: ListCatalougeDto,
  ): Promise<CatalougeDocument[]> {
    const shop: Shop = await this.shopModel.findById(listCatalougeDto.shopId, {
      catalogues: 1,
    });
    return shop.catalogues;
  }

  async createCatalouge(
    createCatalougeDto: CreateCatalougeDto,
  ): Promise<CatalougeDocument> {
    const shop: Shop = await this.shopModel.findById(createCatalougeDto.shopId);
    if (!shop) {
      throw new Error('Shop not found');
    } else {
      const catalouge: CatalougeDocument = {
        title: createCatalougeDto.title,
        description: createCatalougeDto.description,
        order: shop.catalogues.length + 1,
        price: createCatalougeDto.price,
        image: createCatalougeDto.image,
        isOutofStock: createCatalougeDto.isOutofStock,
        images: [{ imageUrl: createCatalougeDto.image, id: '' }],
      };
      const shopUpdated = await this.shopModel.findByIdAndUpdate(
        shop._id,
        {
          $inc: { catalougeCount: 1 },
          $push: { catalogues: catalouge },
        },
        { new: true },
      );

      return shopUpdated.catalogues[shopUpdated.catalogues.length - 1];
    }
  }

  async updateCatalouge(
    updateCatalougeDto: UpdateCatalougeDto,
  ): Promise<CatalougeDocument[]> {
    const shop = await this.shopModel.findOneAndUpdate(
      {
        _id: updateCatalougeDto.shopId,
        'catalogues._id': updateCatalougeDto.catalougeId,
      },
      {
        $set: {
          'catalogues.$.title': updateCatalougeDto.title,
          'catalogues.$.description': updateCatalougeDto.description,
          'catalogues.$.price': updateCatalougeDto.price,
          'catalogues.$.image': updateCatalougeDto.image,
          'catalogues.$.isOutofStock': updateCatalougeDto.isOutofStock,
          'catalogues.$.images': updateCatalougeDto.images,
        },
      },
      {
        new: true,
      },
    );
    return shop.catalogues;
  }

  async deleteCatalouge(
    deleteCatalougeDto: DeleteCatalougeDto,
  ): Promise<CatalougeDocument[]> {
    const shop = await this.shopModel.findByIdAndUpdate(
      deleteCatalougeDto.shopId,
      {
        $inc: { catalougeCount: -1 },
        $pull: { catalogues: { _id: deleteCatalougeDto.catalougeId } },
      },
      { new: true },
    );
    return shop.catalogues;
  }

  async addImageToCatalouge(addImageToCatalouge: AddImageToCatalougeDto) {
    const shop = await this.shopModel.findOneAndUpdate(
      {
        _id: addImageToCatalouge.shopId,
        'catalogues._id': addImageToCatalouge.catalougeId,
      },
      {
        $push: {
          'catalogues.$.images': {
            imageUrl: addImageToCatalouge.image,
            id: '',
          },
        },
      },
      {
        new: true,
      },
    );
    return shop.catalogues;
  }

  async removeImageToCatalouge(
    removeImageToCatalouge: RemoveImageToCatalougeDto,
  ) {
    const shop = await this.shopModel.findOneAndUpdate(
      {
        _id: removeImageToCatalouge.shopId,
        'catalogues._id': removeImageToCatalouge.catalougeId,
      },
      {
        $pull: {
          'catalogues.$.images': {
            id: removeImageToCatalouge.imageId,
          },
        },
      },
      {
        new: true,
      },
    );
    return shop.catalogues;
  }
}
