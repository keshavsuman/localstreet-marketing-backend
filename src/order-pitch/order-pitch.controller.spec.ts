import { Test, TestingModule } from '@nestjs/testing';
import { OrderPitchController } from './order-pitch.controller';

describe('OrderPitchController', () => {
  let controller: OrderPitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPitchController],
    }).compile();

    controller = module.get<OrderPitchController>(OrderPitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
