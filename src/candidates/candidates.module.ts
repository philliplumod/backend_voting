import { Module } from '@nestjs/common';
import { CandidatesController } from './controller/candidates.controller';
import { CandidatesService } from './service/candidates.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService],
  imports: [PrismaModule],
})
export class CandidatesModule {}
