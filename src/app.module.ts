import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as path from 'path';

import { AuthModule } from './auth/auth.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: [path.join(__dirname, '../', 'src/migrations/*.ts')],
      logging: true,
      ssl: true,
    }),
    AuthModule,
    ResumeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
