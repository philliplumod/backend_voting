import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { Position } from '../interface/position.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    try {
      const existingPosition = await this.prisma.position.findUnique({
        where: { position: createPositionDto.position },
      });

      if (existingPosition) {
        throw new Error('Position already exists');
      }

      const newPosition = await this.prisma.position.create({
        data: {
          position: createPositionDto.position,
          max_vote: createPositionDto.max_vote,
          status: 'ACTIVE',
        },
      });

      return newPosition;
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Position[]> {
    return this.prisma.position.findMany();
  }

  async findOne(position_id: string): Promise<Position> {
    try {
      const position = await this.prisma.position.findUnique({
        where: { position_id },
      });

      if (!position) {
        throw new Error('Position not found');
      }
      return position;
    } catch (error) {
      console.error('Error finding position:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve position');
    }
  }

  async update(
    position_id: string,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    try {
      return await this.prisma.position.update({
        where: { position_id },
        data: updatePositionDto,
      });
    } catch (error) {
      console.error('Error updating position:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Position not found');
      }
      throw new InternalServerErrorException('Failed to update position');
    }
  }

  async remove(position_id: string): Promise<Position> {
    try {
      return await this.prisma.position.delete({ where: { position_id } });
    } catch (error) {
      console.error('Error deleting position:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Position not found');
      }
      throw new InternalServerErrorException('Failed to delete position');
    }
  }
}
