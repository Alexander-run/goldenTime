import { Module } from '@nestjs/common';

import { CaseModule } from './modules/case/case.module';
import { JourneyModule } from './modules/journey/journey.module';
import { RequesterModule } from './modules/requester/requester.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cases } from './entities/case.entity';
import { Journey } from './entities/journey.entity';
import { Requesters } from './entities/requester.entity';
import { NestLogsModule } from 'nest-logs';
import { ScheduleModule } from '@nestjs/schedule';

const dbPassword =
  process.env.NODE_ENV && process.env.NODE_ENV === 'dev' ? 'root' : '';
@Module({
  imports: [
    NestLogsModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: dbPassword,
      database: 'horseride',
      entities: [Cases, Journey, Requesters],
      synchronize: true,
    }),
    CaseModule,
    JourneyModule,
    RequesterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
