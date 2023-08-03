import { Controller, Get, Post, Body } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { Journey } from 'src/entities/journey.entity';

@Controller('api/journeys')
export class JourneyController {
  constructor(private readonly appService: JourneyService) {}

  @Get('all')
  getAllJourneys(): Promise<Journey[]> {
    return this.appService.getAllJourneys();
  }

  @Post('create')
  createCase(@Body() params: any): any {
    return this.appService.createJourney({ ...params, createTime: new Date() });
  }

  @Post('delete')
  deleteJourney(@Body() params: any): any {
    return this.appService.deleteJourney(params.id);
  }

  @Post('update')
  updateJourney(@Body() params: any): any {
    return this.appService.updateJourney(params);
  }
}
