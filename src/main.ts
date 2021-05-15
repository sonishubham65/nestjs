import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './base/logger/logger.middleware';
import { SettingService } from './base/setting/setting.service';
import { HttpStatus } from '@nestjs/common';
import { ValidationPipe } from './base/pipes/validation.pipe';
import { LoggerException } from './base/logger/logger.exception';

async function bootstrap() {
  const settingService = new SettingService();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(settingService),
    {
      cors: true,
    },
  );
  app.use(LoggerMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.useGlobalFilters(new LoggerException());
  await app.listen(3000);
}
bootstrap();
