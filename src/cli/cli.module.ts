import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CommandModule } from 'nestjs-command';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [BaseModule, CommandModule],
  providers: [CliService],
})
export class CliModule {}
