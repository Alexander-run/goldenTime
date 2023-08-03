import { Module } from '@nestjs/common';
import { RequesterService } from './requester.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requesters } from '../../entities/requester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requesters])],
  controllers: [],
  providers: [RequesterService],
})
export class RequesterModule {}
