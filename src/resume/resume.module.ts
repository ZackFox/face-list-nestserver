import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { Resume } from './resume.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, Education, Experience])],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
