import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { PositionService } from '../service/position.service';
import { Position } from '../interface/position.interface';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @Get(':position_id')
  findOne(@Param('position_id') position_id: string): Promise<Position> {
    return this.positionService.findOne(position_id);
  }

  @Patch(':position_id')
  update(
    @Param('position_id') position_id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionService.update(position_id, updatePositionDto);
  }

  @Delete(':position_id')
  remove(@Param('position_id') position_id: string): Promise<Position> {
    return this.positionService.remove(position_id);
  }
}
