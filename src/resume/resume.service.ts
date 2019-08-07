import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { ResumeDto } from './dto/resume.dto';
import { Resume } from './resume.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { QueryString } from './interfaces/query.interface';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}

  save(resumeDto: ResumeDto): Promise<Resume> {
    const resumeToUpdate = plainToClass(Resume, resumeDto);

    resumeToUpdate.education = resumeDto.education.map(item =>
      plainToClass(Education, item),
    );
    resumeToUpdate.experience = resumeDto.experience.map(item =>
      plainToClass(Experience, item),
    );

    return getManager().transaction(entityManager => {
      return entityManager.save(resumeToUpdate);
    });
  }

  async findAll(filters, limit: number, offset: number) {
    const queryBuilder = getManager()
      .createQueryBuilder(Resume, 'resume')
      .leftJoinAndSelect('resume.experience', 'experience')
      .orderBy('experience.dateStart', 'DESC');

    Object.keys(filters).forEach((query, i) => {
      queryBuilder
        .andWhere(`lower(resume.${query}) = :val${i}`)
        .setParameter(`val${i}`, filters[query].toLowerCase());
    });

    return queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  findOneById(id: number) {
    return getManager()
      .createQueryBuilder(Resume, 'resume')
      .leftJoinAndSelect('resume.experience', 'experience')
      .orderBy('experience.dateStart', 'DESC')
      .leftJoinAndSelect('resume.education', 'education')
      .where({ id })
      .getOne();
  }

  async deleteOne(id: number) {
    return this.resumeRepository.delete(id);
  }
}
