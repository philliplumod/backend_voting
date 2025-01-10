import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { UpdateCandidateDto } from '../dto/update-candidate.dto';
import { Candidate } from '../interface/candidate.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    try {
      return await this.prisma.candidate.create({
        data: {
          first_name: createCandidateDto.first_name,
          middle_initial: createCandidateDto.middle_initial,
          last_name: createCandidateDto.last_name,
          suffix: createCandidateDto.suffix,
          candidate_number: createCandidateDto.candidate_number,
          position_id: createCandidateDto.position_id,
          photo: createCandidateDto.photo,
          status: 'ACTIVE',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create candidate: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Candidate[]> {
    return await this.prisma.candidate.findMany();
  }

  async findOne(candidate_id: string): Promise<Candidate> {
    try {
      return await this.prisma.candidate.findUnique({
        where: { candidate_id },
      });
    } catch (error) {
      console.error('Error finding candidate:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve candidate');
    }
  }

  async update(
    candidate_id: string,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    try {
      return await this.prisma.candidate.update({
        where: { candidate_id },
        data: updateCandidateDto,
      });
    } catch (error) {
      console.error('Error updating candidate:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Candidate not found');
      }
      throw new InternalServerErrorException('Failed to update candidate');
    }
  }

  async remove(candidate_id: string): Promise<Candidate> {
    try {
      return await this.prisma.candidate.delete({ where: { candidate_id } });
    } catch (error) {
      console.error('Error deleting candidate:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Candidate not found');
      }
      throw new InternalServerErrorException('Failed to delete candidate');
    }
  }
}
