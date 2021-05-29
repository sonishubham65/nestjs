import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './base/logger/logger.middleware';
import { SettingService } from './base/setting/setting.service';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { LoggerException } from './base/logger/logger.exception';
import { TransfromerMiddleware } from './base/middlewares/transformer.middleware';

async function bootstrap() {
  const settingService = new SettingService();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(settingService),
    {
      cors: true,
    },
  );
  app.use(LoggerMiddleware);
  app.use(TransfromerMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      //forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.useGlobalFilters(new LoggerException());
  await app.listen(3000);
}
bootstrap();
