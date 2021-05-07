import { Injectable } from '@nestjs/common';
import * as config from 'config';

export class JWTConfig {
  constructor() {}
  get accesstoken_secret() {
    return config.get('secret.jwt.accessSecret');
  }
  get refreshtoken_secret() {
    return config.get('secret.refreshtoken');
  }
  get accesstoken_expiry() {
    return config.get('secret.jwt.accessExpiresIn');
  }
  get refreshtoken_expiry() {
    return config.get('expiry.refreshtoken');
  }
}
