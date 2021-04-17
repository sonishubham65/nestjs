import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { CliModule } from './cli/cli.module';

process.env.NODE_CONFIG_STRICT_MODE = 'true';

(async () => {
  const app = await NestFactory.createApplicationContext(CliModule);
  app.select(CommandModule).get(CommandService).exec();
})();
