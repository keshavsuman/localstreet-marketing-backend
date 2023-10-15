import { Module } from '@nestjs/common';
import { OrderPitchController } from './order-pitch.controller';
import { OrderPitchService } from './order-pitch.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderPitchSchema } from './order-pitch.schema';
import { HelperModule } from 'src/helper/helper.module';
import { OrderSchema } from './order.schema';

@Module({
  imports: [
    HelperModule,
    MongooseModule.forFeature([
      { name: 'orderPitch', schema: OrderPitchSchema },
      { name: 'order', schema: OrderSchema },
    ]),
  ],
  controllers: [OrderPitchController],
  providers: [OrderPitchService],
})
export class OrderPitchModule {}
