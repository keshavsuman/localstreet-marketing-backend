import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderPitchDto, FetchRecentOrders } from './dto/orderPitch.dto';
import { OrderPitchService } from './order-pitch.service';
import { ResponseHandlerService } from 'src/helper/response-helper.service';

@Controller('order-pitch')
export class OrderPitchController {
  constructor(
    private readonly orderPitchService: OrderPitchService,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  @Post()
  async createOrderPitch(@Body() createOrderPitchDto: CreateOrderPitchDto) {
    try {
      const orderPitch = await this.orderPitchService.createOrderPitch(
        createOrderPitchDto,
      );
      return this.responseHandlerService.response(
        null,
        HttpStatus.CREATED,
        'Order pitch saved successully',
        orderPitch,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/fetchRecentOrders')
  async fetchRecentOrders(@Query() fetchRecentOrders: FetchRecentOrders) {
    try {
      const orders = await this.orderPitchService.fetchRecentOrders(
        fetchRecentOrders.orderId,
      );
      return this.responseHandlerService.response(
        null,
        HttpStatus.CREATED,
        'Recent Orders fetched successully',
        orders,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:userEmail')
  async fetchOrderPitches(@Param('userEmail') userMail: string) {
    try {
      const orderPitches = await this.orderPitchService.getOrdersByUserEmail(
        userMail,
      );
      return this.responseHandlerService.response(
        null,
        HttpStatus.CREATED,
        'Order pitches fetched successully',
        orderPitches,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
