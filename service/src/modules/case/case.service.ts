import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from '../../entities/case.entity';
import { Requesters } from '../../entities/requester.entity';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Cases)
    private readonly caseRepository: Repository<Cases>,
    @InjectRepository(Requesters)
    private readonly requesterRepository: Repository<Requesters>,
  ) {}

  async getAllCases() {
    // find all cases sort by depatureDate
    return this.caseRepository.find({
      order: {
        depatureDate: 'DESC',
      },
    });
  }

  async createCase(ip, params) {
    const createDate = new Date().toISOString().slice(0, 10);
    // TODO add interceptor to check if the request IP has exceed the max request limit (3)
    return this.requesterRepository
      .findOne({ where: { ipAddress: ip, createDate: createDate } })
      .then((requester) => {
        if (requester) {
          if (requester.tryCount >= 3) {
            return new Error('Exceed max request limit');
          } else {
            this.requesterRepository.update(requester.id, {
              tryCount: requester.tryCount + 1,
            });
            return this.caseRepository.save(params);
          }
        } else {
          this.requesterRepository.save({
            ipAddress: ip,
            tryCount: 1,
            createDate,
          });
          return this.caseRepository.save(params);
        }
      });
  }

  async deleteCase(id) {
    return this.caseRepository.delete(id);
  }

  async updateCase(params) {
    return this.caseRepository.update(params.id, params);
  }

  async getAllRequesters() {
    return this.requesterRepository.find();
  }
}
