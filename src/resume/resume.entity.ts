import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { name: 'ownerId' })
  @ManyToOne(() => User, (user: User) => user.resumes)
  owner: User;

  @Column('varchar', { length: '100' })
  firstname: string;

  @Column('varchar', { length: '100' })
  lastname: string;

  @Column('integer', { default: 14 })
  age: number;

  @Column('varchar')
  gender: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true })
  photo: string;

  @Column('varchar', { length: '200' })
  position: string;

  @OneToMany(type => Education, ed => ed.resume, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  education: Education[];

  @OneToMany(type => Experience, exp => exp.resume, {
    cascade: true,
  })
  experience: Experience[];
}
