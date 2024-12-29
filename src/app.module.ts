import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

import { CandidatesModule } from './candidates/candidates.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [UsersModule, PrismaModule, CandidatesModule, PositionModule],
})
export class AppModule {}
