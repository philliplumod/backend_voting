import { Module } from '@nestjs/common';
import { BallotsService } from './service/ballots.service';
import { BallotsController } from './controller/ballots.controller';

@Module({
  controllers: [BallotsController],
  providers: [BallotsService],
})
export class BallotsModule {}
