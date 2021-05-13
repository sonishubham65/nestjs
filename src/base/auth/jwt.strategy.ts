import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SettingService } from 'src/base/setting/setting.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private settingService: SettingService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: settingService.jwt.accesstoken_secret,
    });
  }

  async validate(payload: any) {
    console.log(`payload`, payload);
    return { id: payload.id, email: payload.email };
  }
}
