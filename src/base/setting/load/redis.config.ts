import * as config from 'config';

export class RedisConfig {
  constructor() {}
  get host() {
    return config.get('databases.redis.host');
  }
  get password() {
    return config.get('databases.redis.password');
  }
  get port() {
    return config.get('databases.redis.port');
  }
}
