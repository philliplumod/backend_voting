import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './service/users.service';
import { UserAuthController } from './controllers/user-auth.controller';
import { AuthService } from './service/user-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/jwt/jwt-strategy';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController, UserAuthController],
  providers: [UsersService, AuthService, JwtStrategy],
})
export class UsersModule {}
