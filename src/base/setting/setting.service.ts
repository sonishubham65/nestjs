import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './load/database.config';

@Injectable()
export class SettingService {
  db;
  constructor() {
    this.db = new DatabaseConfig();
  }
}
