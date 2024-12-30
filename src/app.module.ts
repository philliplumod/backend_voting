import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

import { CandidatesModule } from './candidates/candidates.module';
import { PositionModule } from './position/position.module';
import { BallotsModule } from './ballots/ballots.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    CandidatesModule,
    PositionModule,
    BallotsModule,
  ],
})
export class AppModule {}
