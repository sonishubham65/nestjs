import {
  CacheInterceptor,
  CacheModule,
  DynamicModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { DomainModule } from './domain/domain.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SettingService } from './base/setting/setting.service';
import { LoggerInterceptor } from './base/logger/logger.interceptor';

export class AppModule {
  static forRoot(settingService: SettingService): DynamicModule {
    const Redis = require('ioredis');
    const cluster = new Redis({
      host: settingService.db.redisHost,
      port: settingService.db.redisPort,
    });
    const modulesToImport = [
      ThrottlerModule.forRoot({
        ttl: 10,
        limit: 50,
        storage: new ThrottlerStorageRedisService(cluster),
      }),
      BaseModule,
      DomainModule,
    ];
    return {
      module: AppModule,
      imports: modulesToImport,
      providers: [
        AppService,
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: LoggerInterceptor,
        },
      ],
      controllers: [AppController],
    };
  }

  configure(consumer: MiddlewareConsumer) {}
}
