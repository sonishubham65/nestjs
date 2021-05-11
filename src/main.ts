import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ErrorException } from './base/exception/error.exception';
import { SettingService } from './base/setting/setting.service';
async function bootstrap() {
  const settingService = new SettingService();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(settingService),
  );
  app.useGlobalFilters(new ErrorException());
  await app.listen(3000);
}
bootstrap();
