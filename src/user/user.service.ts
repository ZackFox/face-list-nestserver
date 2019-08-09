import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<any> {
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async getUserWithRelations(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.resumes', 'resumes')
      .addSelect(['resumes.id', 'resumes.position'])
      .where({ email })
      .getOne();
  }
}
