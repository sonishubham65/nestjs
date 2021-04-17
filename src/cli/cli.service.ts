import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { exec as originalExec } from 'child_process';
import { promisify } from 'util';
import { SettingService } from '../base/setting/setting.service';

const exec = promisify(originalExec);

@Injectable()
export class CliService {
  constructor(private settingService: SettingService) {}

  @Command({ command: 'echo:hello', describe: 'echo hello' })
  echoHello() {
    console.log('Hello');
  }

  @Command({ command: 'db:seed', describe: 'Running db seed' })
  async dbSeed(): Promise<any> {
    console.log('Finished DB seed. Nothing to do here right now');
  }

  @Command({ command: 'db:drop', describe: 'Drop enabled databases' })
  async dbDrop(): Promise<any> {
    console.log('Dropping SQL DB');
    await CliService.runProcess(
      'npm --scripts-prepend-node-path=true run typeorm -- schema:drop',
    );
  }

  @Command({
    command: 'db:migration:generate',
    describe: 'Run migrations for enabled databases',
  })
  async dbMigrationGenerate(): Promise<any> {
    await CliService.runProcess(
      'npm --scripts-prepend-node-path=true run typeorm migration:generate -n first',
    );
  }

  @Command({
    command: 'db:migrate',
    describe: 'Run migrations for enabled databases',
  })
  async dbMigrate(): Promise<any> {
    // || this.settingService.db.dropSchema()
    if (false) {
      await this.dbDrop();
    }
    console.log('Running migrations for SQL');
    await CliService.runProcess(
      'npm --scripts-prepend-node-path=true run typeorm -- migration:run',
    );
  }

  private static async runProcess(command) {
    console.log(`Running command: ${command}`);
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  }
}
