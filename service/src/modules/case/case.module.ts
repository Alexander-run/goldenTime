import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cases } from '../../entities/case.entity';
import { Requesters } from '../../entities/requester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cases, Requesters])],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
