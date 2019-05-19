import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as path from 'path';

import { ResumeController } from './resume/resume.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: [path.join(__dirname, '../', '/src/**/*.entity.ts')],
      // migrations: [path.join(__dirname, "src/migrations/*.ts")],
      logging: true,
      ssl: true,
    }),
  ],
  controllers: [ResumeController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
