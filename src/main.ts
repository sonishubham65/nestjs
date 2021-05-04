import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ErrorException } from './base/exception/error.exception';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(),
  );
  app.useGlobalFilters(new ErrorException());
  await app.listen(3000);
}
bootstrap();
