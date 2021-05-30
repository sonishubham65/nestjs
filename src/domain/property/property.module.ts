import { CacheInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionName } from 'src/base/database/database.constant';
import { SettingService } from 'src/base/setting/setting.service';
import { PropertyEntity } from './entity/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CaslProperty } from './casl.property';

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
