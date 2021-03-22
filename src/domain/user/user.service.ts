import { Injectable } from '@nestjs/common';
import { SettingService } from 'src/base/setting/setting.service';

@Injectable()
export class UserService {
  constructor(private settingService: SettingService) {}
  url() {
    console.log(this.settingService.db.url);
  }
}
