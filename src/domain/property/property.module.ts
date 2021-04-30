import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionName } from 'src/base/database/database.constant';
import { SettingService } from 'src/base/setting/setting.service';
import { PropertyEntity } from './entity/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity], connectionName)],
  controllers: [PropertyController],
  providers: [PropertyService, SettingService],
})
export class PropertyModule {}
