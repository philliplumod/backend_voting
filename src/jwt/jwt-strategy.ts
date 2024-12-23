//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { user_id: string }) {
    if (!payload.user_id) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findOne(payload.user_id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
