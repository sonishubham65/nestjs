import * as config from 'config';

export class DatabaseConfig {
  constructor() {}
  get url() {
    return config.get('databases.postgres.url');
  }
  get entityAutoload() {
    return config.get('databases.postgres.entity.autoload');
  }
  get entityPath() {
    return config.get('databases.postgres.entity.path');
  }
}
