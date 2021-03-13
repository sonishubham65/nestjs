import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './load/database.config';

@Injectable()
export class SettingService {
  constructor(public db: DatabaseConfig) {}
}
