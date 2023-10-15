import { Test, TestingModule } from '@nestjs/testing';
import { OrderPitchService } from './order-pitch.service';

describe('OrderPitchService', () => {
  let service: OrderPitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPitchService],
    }).compile();

    service = module.get<OrderPitchService>(OrderPitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
