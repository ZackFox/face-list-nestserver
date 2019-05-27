import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Resume } from '../resume/resume.entity';
import { CreateUserDto } from './createUser.dto';

@Entity()
export class User {
  constructor(userData: CreateUserDto) {
    if (!!userData) {
      this.firstname = userData.firstname;
      this.lastname = userData.lastname;
      this.age = userData.age;
      this.sex = userData.sex;
      this.city = userData.city;
      this.email = userData.email;
      this.password = userData.password;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  firstname: string;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  lastname: string;

  @Column({ type: 'integer', nullable: false })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  sex: string;

  @Column({ type: 'varchar', nullable: false, length: '160' })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  password: string;

  @OneToMany(() => Resume, (resume: Resume) => resume.owner)
  resumes: Resume[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
