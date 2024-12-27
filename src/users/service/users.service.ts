import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interface/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(user_id: string): Promise<User> {
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

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
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

  async remove(user_id: string): Promise<User> {
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
