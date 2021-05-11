import { connectionName } from './src/base/database/database.constant';
import { SettingService } from './src/base/setting/setting.service';
const settingService = new SettingService();

export = [
  {
    name: connectionName,
    ...settingService.db.typeormconfig([
      'src/domain/**/**/*.entity.{js,ts}',
      'src/domain/**/*.entity.{js,ts}',
    ]),
  },
];
