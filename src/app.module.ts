import { Module } from '@nestjs/common';
import { OrderPitchModule } from './order-pitch/order-pitch.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    OrderPitchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
