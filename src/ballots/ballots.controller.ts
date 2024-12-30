import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BallotsService } from './ballots.service';
import { CreateBallotDto } from './dto/create-ballot.dto';
import { UpdateBallotDto } from './dto/update-ballot.dto';

@Controller('ballots')
export class BallotsController {
  constructor(private readonly ballotsService: BallotsService) {}

  @Post()
  create(@Body() createBallotDto: CreateBallotDto) {
    return this.ballotsService.create(createBallotDto);
  }

  @Get()
  findAll() {
    return this.ballotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ballotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBallotDto: UpdateBallotDto) {
    return this.ballotsService.update(+id, updateBallotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ballotsService.remove(+id);
  }
}
