import { Test, TestingModule } from '@nestjs/testing';
import { BaseModule } from '../base.module';
import { DatabaseModule } from './database.module';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BaseModule, DatabaseModule],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
