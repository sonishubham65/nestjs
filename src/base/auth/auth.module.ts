import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../../domain/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SettingService } from '../../base/setting/setting.service';
import { JwtStrategy } from './jwt.strategy';
import { SettingModule } from '../setting/setting.module';
import { UserService } from 'src/domain/user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    SettingModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (settingService: SettingService) => ({
        secret: settingService.jwt.accesstoken_secret,
        signOptions: {
          expiresIn: settingService.jwt.accesstoken_expiry,
        },
      }),
      inject: [SettingService],
      imports: [SettingModule],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
