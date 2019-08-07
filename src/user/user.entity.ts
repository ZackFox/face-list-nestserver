import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

import { Resume } from '../resume/resume.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: '100' })
  firstname: string;

  @Column('varchar', { length: '100' })
  lastname: string;

  @Column('varchar')
  city: string;

  @Column('varchar', { length: '160' })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { length: '100' })
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
