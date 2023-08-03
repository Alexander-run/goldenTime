import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journey } from '../../entities/journey.entity';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
  ) {}
  async getAllJourneys() {
    return this.journeyRepository.find();
  }
  async createJourney(params) {
    return this.journeyRepository.save(params);
  }
  async deleteJourney(id) {
    return this.journeyRepository.delete(id);
  }
  async updateJourney(params) {
    return this.journeyRepository.update(params.id, params);
  }
}
