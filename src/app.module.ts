import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { DomainModule } from './domain/domain.module';

export class AppModule {
  static forRoot(): DynamicModule {
    const modulesToImport = [BaseModule, DomainModule];
    return {
      module: AppModule,
      imports: modulesToImport,
      providers: [AppService],
      controllers: [AppController],
    };
  }

  configure(consumer: MiddlewareConsumer) {}
}
