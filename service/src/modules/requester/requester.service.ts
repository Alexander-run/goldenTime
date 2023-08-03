import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requesters } from '../../entities/requester.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RequesterService {
  constructor(
    @InjectRepository(Requesters)
    private readonly requesterRepository: Repository<Requesters>,
  ) {}
  // @Cron(CronExpression.EVERY_DAY_AT_4AM)
  // async resetRequester() {
  //   return this.requesterRepository.clear();
  // }
  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async resetRequester() {
    return this.requesterRepository.clear();
  }
}
