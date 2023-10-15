import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ConsumerCategory, ShopCategory } from './dto/orderPitch.dto';

export type OrderPitch = HydratedDocument<OrderPitchDocument>;

@Schema({ timestamps: true })
export class OrderPitchDocument {
  @Prop({ required: true })
  team_lead: string;

  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  user_email: string;

  @Prop({ required: true, enum: ShopCategory })
  shop_category: string;

  @Prop({ required: true, enum: ConsumerCategory })
  consumer_category: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  orderMongoId: mongoose.Schema.Types.ObjectId;
}
export const OrderPitchSchema =
  SchemaFactory.createForClass(OrderPitchDocument);

OrderPitchSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
