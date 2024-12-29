import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  max_vote: number;
}
