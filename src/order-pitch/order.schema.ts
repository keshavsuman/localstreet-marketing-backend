import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Order = HydratedDocument<OrderDocument>;

@Schema()
export class OrderDocument {
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  shopId: mongoose.Schema.Types.ObjectId;

  @Prop()
  orderId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  status: string;

  @Prop()
  mobileNumber: string;

  @Prop()
  shopMobileNumber: string;

  @Prop()
  totalAmount: number;

  @Prop()
  totalItem: number;

  @Prop()
  notes: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
