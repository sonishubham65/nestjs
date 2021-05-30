import { Injectable } from '@nestjs/common';
import { BucketConfig } from './load/bucket.config';
import { DatabaseConfig } from './load/database.config';
import { JWTConfig } from './load/jwt.config';
import { RedisConfig } from './load/redis.config';
import { SecretConfig } from './load/secret.config';

const databaseConfig = new DatabaseConfig();
const jwtConfig = new JWTConfig();
const secretConfig = new SecretConfig();
const bucketConfig = new BucketConfig();
const redisConfig = new RedisConfig();

@Injectable()
export class SettingService {
  public db;
  public redis;
  public jwt;
  public secret;
  public bucket;
  constructor() {
    this.db = databaseConfig;
    this.jwt = jwtConfig;
    this.secret = secretConfig;
    this.bucket = bucketConfig;
    this.redis = redisConfig;
  }
}
