import { Controller, Get, Post, Body, Request, Headers } from '@nestjs/common';
import { CaseService } from './case.service';
import { Cases } from 'src/entities/case.entity';

@Controller('api/cases')
export class CaseController {
  constructor(private readonly appService: CaseService) {}

  @Get('all')
  getAllCases(): Promise<Cases[]> {
    return this.appService.getAllCases();
  }

  @Post('create')
  createCase(
    @Body() params: any,
    @Headers('x-real-ip') ip: any,
    @Request() req: any,
  ): any {
    return this.appService.createCase(ip, {
      ...params,
      createTime: new Date(),
    });
  }
  @Post('delete')
  deleteCase(@Body() params: any): any {
    return this.appService.deleteCase(params);
  }
  @Post('update')
  updateCase(@Body() params: any): any {
    return this.appService.updateCase(params);
  }
}
