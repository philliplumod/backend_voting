import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/user-auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from 'src/auth/auth.entity';
import { User } from '../interface/user.interface';

@Controller('auth-user')
export class UserAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(
    @Body() { username, password }: LoginUserDto,
  ): Promise<{ auth: AuthEntity; user: User }> {
    return this.authService.login(username, password);
  }
}
