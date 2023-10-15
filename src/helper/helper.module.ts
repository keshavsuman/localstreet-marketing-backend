import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelperService } from './helper.service';
// import { RedisService } from './redis.service';
import { ResponseHandlerService } from './response-helper.service';

@Module({
  imports: [ConfigModule],
  providers: [
    HelperService,
    ResponseHandlerService,
    //  RedisService
  ],
  exports: [
    HelperService,
    ResponseHandlerService,
    // RedisService
  ],
})
export class HelperModule {}
