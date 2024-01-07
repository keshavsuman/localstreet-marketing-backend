import { Module } from '@nestjs/common';
import { OrderPitchModule } from './order-pitch/order-pitch.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    OrderPitchModule,
    ShopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
