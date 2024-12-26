import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use ConfigService
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

    return user; // Return the validated user
  }
}
