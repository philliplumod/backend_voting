import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/user-auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from 'src/entity/auth.entity';

@Controller('auth-user')
export class UserAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { username, password }: LoginUserDto) {
    return this.authService.login(username, password);
  }
}
