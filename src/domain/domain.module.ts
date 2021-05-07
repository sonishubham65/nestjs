import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [UserModule, PropertyModule],
  providers: [],
})
export class DomainModule {}
