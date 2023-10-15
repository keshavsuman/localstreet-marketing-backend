// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Redis } from 'ioredis';

// @Injectable()
// export class RedisService {
//   private readonly redis: Redis;
//   constructor(private readonly configService: ConfigService) {
//     this.redis = new Redis(this.configService.get('REDIS_URL'));
//   }

//   async set(key: string, value: string) {
//     return await this.redis.set(key, value);
//   }

//   async get(key: string) {
//     return await this.redis.get(key);
//   }

//   async remove(key: string) {
//     return await this.redis.del(key);
//   }

//   async sadd(key: string, value: string) {
//     return await this.redis.sadd(key, value);
//   }

//   async smembers(key: string) {
//     return await this.redis.smembers(key);
//   }

//   async srem(key: string, value: string) {
//     return await this.redis.srem(key, value);
//   }
// }
