import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './shop.schema';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'shop', schema: ShopSchema }]),
    HelperModule,
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
