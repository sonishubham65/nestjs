import { Module } from '@nestjs/common';
import { SettingModule } from 'src/base/setting/setting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [],
})
export class DomainModule {}
