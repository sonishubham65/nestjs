import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { DomainModule } from './domain/domain.module';
import { APP_GUARD } from '@nestjs/core';
const Redis = require('ioredis');

const cluster = new Redis({
  host: 'localhost',
  port: 6379,
});
export class AppModule {
  static forRoot(): DynamicModule {
    const modulesToImport = [
      ThrottlerModule.forRoot({
        ttl: 10,
        limit: 30,
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
      ],
      controllers: [AppController],
    };
  }

  configure(consumer: MiddlewareConsumer) {}
}
