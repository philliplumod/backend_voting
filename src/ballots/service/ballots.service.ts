import { Injectable } from '@nestjs/common';
import { CreateBallotDto } from '../dto/create-ballot.dto';
import { UpdateBallotDto } from '../dto/update-ballot.dto';

@Injectable()
export class BallotsService {
  create(createBallotDto: CreateBallotDto) {
    return 'This action adds a new ballot';
  }

  findAll() {
    return `This action returns all ballots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ballot`;
  }

  update(id: number, updateBallotDto: UpdateBallotDto) {
    return `This action updates a #${id} ballot`;
  }

  remove(id: number) {
    return `This action removes a #${id} ballot`;
  }
}
