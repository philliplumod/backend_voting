import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from 'src/auth/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { User } from '../interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(
    username: string,
    password: string,
  ): Promise<{ auth: AuthEntity; user: User }> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      throw new NotFoundException(`No user found for user: ${username}`);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.jwtService.sign({ user_id: user.user_id });
    const auth = { accessToken: token };

    return { auth, user };
  }
}
