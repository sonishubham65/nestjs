import * as config from 'config';

export class DatabaseConfig {
  constructor() {}
  get url() {
    return config.get('databases.postgres.url');
  }
  get sync() {
    return config.get('databases.postgres.sync');
  }
  get entityAutoload() {
    return config.get('databases.postgres.entity.autoload');
  }
  get entityPath() {
    return config.get('databases.postgres.entity.path');
  }
  get dropSchema() {
    return config.get('databases.postgres.dropSchema');
  }
  get migrationRun() {
    return config.get('databases.postgres.migration.run');
  }
  get logging() {
    return config.get('databases.postgres.logging');
  }
  get redisHost() {
    return config.get('databases.redis.host');
  }
  get redisPort() {
    return config.get('databases.redis.port');
  }
  typeormconfig(
    entities = [
      '../../../domain/**/**/*.entity.ts',
      '../../../domain/**/*.entity.ts',
      'dist/src/domain/**/**/*.entity.ts',
    ],
  ) {
    return {
      type: 'postgres',
      url: this.url,
      sync: this.sync,
      logger: 'advanced-console',
      logging: this.logging,
      dropSchema: this.dropSchema,
      migrations: [__dirname + '/../../database/migration/*.ts'],
      entities: entities,
      migrationsRun: this.migrationRun,
      cli: {
        migrationsDir: 'src/base/database/migration/',
      },
      extra: { max: 3 },
      maxQueryExecutionTime: 1000,
    };
  }
}
