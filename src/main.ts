import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ErrorException } from './base/exception/error.exception';
import { LoggerMiddleware } from './base/logger/logger.middleware';
import { SettingService } from './base/setting/setting.service';
import { urlencoded, json } from 'body-parser';

async function bootstrap() {
  const settingService = new SettingService();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(settingService),
    {
      bodyParser: true,
      cors: true,
    },
  );
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(LoggerMiddleware);
  app.useGlobalFilters(new ErrorException());
  await app.listen(3000);
}
bootstrap();
