import * as config from 'config';

export class DatabaseConfig {
  constructor() {}
  get url(): string {
    return config.get('databases.postgres.url');
  }
}
