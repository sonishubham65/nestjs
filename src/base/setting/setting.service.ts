import { Injectable } from '@nestjs/common';
import { BucketConfig } from './load/bucket.config';
import { DatabaseConfig } from './load/database.config';
import { JWTConfig } from './load/jwt.config';
import { SecretConfig } from './load/secret.config';

@Injectable()
export class SettingService {
  public db;
  public jwt;
  public secret;
  public bucket;
  constructor() {
    this.db = new DatabaseConfig();
    this.jwt = new JWTConfig();
    this.secret = new SecretConfig();
    this.bucket = new BucketConfig();
  }
}
