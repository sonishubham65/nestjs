import * as config from 'config';

export class BucketConfig {
  constructor() {}

  get name() {
    return config.get('storage.bucket.name');
  }

  get propertyFolder() {
    return config.get('storage.bucket.propertyFolder');
  }
}
