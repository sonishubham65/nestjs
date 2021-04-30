import { Module } from '@nestjs/common';
import { SettingModule } from 'src/base/setting/setting.module';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [UserModule, PropertyModule],
  providers: [],
})
export class DomainModule {}
