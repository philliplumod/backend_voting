import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import * as QRCode from 'qrcode';
import { User } from '../interface/user.interface';

@Injectable()
export class UserCreateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUserByEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUserByEmail) {
        throw new ConflictException('User with this email already exists');
      }

      const existingUserByUsername = await this.prisma.user.findUnique({
        where: { username: createUserDto.username },
      });

      if (existingUserByUsername) {
        throw new ConflictException('User with this username already exists');
      }

      const hashPassword = await hash(createUserDto.password, 10);

      const userData = JSON.stringify({
        fullname: `${createUserDto.first_name} ${createUserDto.middle_initial} ${createUserDto.last_name} ${createUserDto.suffix}`,
        username: createUserDto.username,
        email: createUserDto.email,
        contact_number: createUserDto.contact_number,
        year_level: createUserDto.year_level,
        status: createUserDto.status,
      });
      const qrBuffer = await QRCode.toBuffer(userData);
      const qrImageBuffer =
        'data:image/png;base64,' + qrBuffer.toString('base64');

      const user = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          first_name: createUserDto.first_name,
          middle_initial: createUserDto.middle_initial,
          last_name: createUserDto.last_name,
          suffix: createUserDto.suffix,
          contact_number: createUserDto.contact_number,
          year_level: createUserDto.year_level,
          status: createUserDto.status,
          password: hashPassword,
          qr_code: qrImageBuffer,
          user_role_id: createUserDto.user_role_id,
        },
      });

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
