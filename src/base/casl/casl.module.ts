import { Module } from '@nestjs/common';
import { CaslProperty } from './casl.property';

@Module({
  providers: [CaslProperty],
  exports: [CaslProperty],
})
export class CaslModule {}
