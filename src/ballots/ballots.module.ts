import { Module } from '@nestjs/common';
import { BallotsService } from './ballots.service';
import { BallotsController } from './ballots.controller';

@Module({
  controllers: [BallotsController],
  providers: [BallotsService],
})
export class BallotsModule {}
