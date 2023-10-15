import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderPitchDocument, OrderPitch } from './order-pitch.schema';
import { Model } from 'mongoose';
import { CreateOrderPitchDto } from './dto/orderPitch.dto';
import { OrderDocument } from './order.schema';

@Injectable()
export class OrderPitchService {
  constructor(
    @InjectModel('orderPitch')
    private readonly orderPitchModel: Model<OrderPitchDocument>,
    @InjectModel('order')
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrderPitch(
    createOrderPitchDto: CreateOrderPitchDto,
  ): Promise<OrderPitch> {
    return (await this.orderPitchModel.create(createOrderPitchDto)).toJSON();
  }

  async getOrdersByUserEmail(email: string): Promise<Array<OrderPitch>> {
    return await this.orderPitchModel.find({ user_email: email });
  }

  async fetchRecentOrders(orderId: string) {
    return await this.orderModel.find({
      orderId: { $regex: orderId, $options: 'i' },
    });
  }
}
