import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { UpdateCandidateDto } from '../dto/update-candidate.dto';
import { Candidate } from '../interface/candidate.interface';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get()
  findAll(): Promise<Candidate[]> {
    return this.candidatesService.findAll();
  }

  @Get(':candidate_id')
  findOne(@Param('candidate_id') candidate_id: string): Promise<Candidate> {
    return this.candidatesService.findOne(candidate_id);
  }

  @Patch(':candidate_id')
  update(
    @Param('candidate_id') candidate_id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.update(candidate_id, updateCandidateDto);
  }

  @Delete(':candidate_id')
  remove(@Param('candidate_id') candidate_id: string): Promise<Candidate> {
    return this.candidatesService.remove(candidate_id);
  }
}
