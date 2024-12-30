import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  middle_initial: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  suffix: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  candidate_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photo: string;
}
