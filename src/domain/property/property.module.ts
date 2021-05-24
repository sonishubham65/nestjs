import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionName } from 'src/base/database/database.constant';
import { SettingService } from 'src/base/setting/setting.service';
import { PropertyEntity } from './entity/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CaslProperty } from '../../base/casl/casl.property';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity], connectionName)],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    SettingService,
    CaslProperty,
    //{ provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class PropertyModule {}
