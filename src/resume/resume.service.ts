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

  createResume(resumeDto: ResumeDto): Promise<Resume> {
    const resume = plainToClass(Resume, resumeDto);

    const edList = resumeDto.education.map(item =>
      plainToClass(Education, item),
    );
    const expList = resumeDto.experience.map(item =>
      plainToClass(Experience, item),
    );

    return getManager().transaction(entityManager => {
      resume.education = edList;
      resume.experience = expList;
      return entityManager.save(resume);
    });
  }

  async findAll(query, limit: number, offset: number) {
    const keys = Object.keys(query);
    const queryBuilder = getManager()
      .createQueryBuilder(Resume, 'resume')
      .leftJoinAndSelect('resume.experience', 'experience')
      .orderBy('experience.dateStart', 'DESC');

    keys.forEach((param, i) => {
      queryBuilder
        .andWhere(`resume.${param} = :val${i}`)
        .setParameter(`val${i}`, query[param]);
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
