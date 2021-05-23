import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, PropertyModule, RoleModule],
  providers: [],
})
export class DomainModule {}
