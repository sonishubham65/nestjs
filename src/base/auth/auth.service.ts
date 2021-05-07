import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User does not exists.', HttpStatus.NO_CONTENT);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return { ...user, password: undefined };
    } else {
      throw new HttpException('Wrong password.', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
