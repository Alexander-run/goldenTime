import { Module } from '@nestjs/common';
import { JourneyController } from './journey.controller';
import { JourneyService } from './journey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from '../../entities/journey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journey])],
  controllers: [JourneyController],
  providers: [JourneyService],
})
export class JourneyModule {}
