import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './load/database.config';
import { JWTConfig } from './load/jwt.config';

@Injectable()
export class SettingService {
  public db;
  public jwt;
  constructor() {
    this.db = new DatabaseConfig();
    this.jwt = new JWTConfig();
  }
}
