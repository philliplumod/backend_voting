import { Module } from '@nestjs/common';
import { PositionController } from './controllers/position.controller';
import { PositionService } from './service/position.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports: [PrismaModule],
})
export class PositionModule {}
