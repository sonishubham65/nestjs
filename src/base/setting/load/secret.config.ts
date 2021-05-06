import * as config from 'config';

export class SecretConfig {
  constructor() {}

  get saltRound() {
    return config.get('secret.password.saltRound');
  }
}
