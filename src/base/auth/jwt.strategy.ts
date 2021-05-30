import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SettingService } from 'src/base/setting/setting.service';
import { UserService } from 'src/domain/user/user.service';
import { RoleService } from 'src/domain/role/role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private settingService: SettingService,
    private userService: UserService,
    private roleService: RoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: settingService.jwt.accesstoken_secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.id);
    if (user) {
      const roles: any = await this.roleService.findAll(payload.id);
      return {
        id: payload.id,
        email: payload.email,
        roles: roles.map((role) => role.role),
      };
    }
  }
}
