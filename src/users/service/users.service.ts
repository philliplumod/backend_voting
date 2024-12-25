import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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

      return await this.prisma.user.create({
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
          userRole: {
            connect: { role_id: createUserDto.user_role_id },
          },
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

  async findOne(user_id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { user_id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    try {
      const dataToUpdate = { ...updateUserDto };
      if (updateUserDto.password) {
        dataToUpdate.password = await hash(updateUserDto.password, 10);
      }
      return this.prisma.user.update({
        where: { user_id },
        data: dataToUpdate,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(user_id: string) {
    try {
      return await this.prisma.user.delete({ where: { user_id } });
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
