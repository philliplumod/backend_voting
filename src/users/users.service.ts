import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashPassword = await hash(createUserDto.password, 10);

      return this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashPassword,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(user_id: string) {
    return this.prisma.user.findUnique({ where: { user_id } });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const hashPassword = await hash(updateUserDto.password, 10);

    return this.prisma.user.update({
      where: { user_id },
      data: {
        ...updateUserDto,
        password: hashPassword,
      },
    });
  }

  remove(user_id: string) {
    return this.prisma.user.delete({ where: { user_id } });
  }
}
