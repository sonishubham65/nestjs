import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SettingService } from '../setting/setting.service';
import { SettingModule } from '../setting/setting.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (settingService: SettingService) => ({
        ttl: 5, // seconds
        max: 10, // maximum number of items in cache
        store: redisStore,
        host: settingService.redis.host,
        password: settingService.redis.password,
        port: settingService.redis.port,
      }),
      inject: [SettingService],
      imports: [SettingModule],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [
    CacheModule.registerAsync({
      useFactory: async (settingService: SettingService) => ({
        ttl: 5, // seconds
        max: 10, // maximum number of items in cache
        store: settingService.db.redis.redisStore,
        host: settingService.db.redis.host,
        password: settingService.db.redis.password,
        port: settingService.db.redis.port,
      }),
      inject: [SettingService],
      imports: [SettingModule],
    }),
  ],
})
export class BaseCacheModule {}
