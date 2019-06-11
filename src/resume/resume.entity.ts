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

  @ManyToOne(() => User, (user: User) => user.resumes)
  owner: User;

  @Column('varchar', { length: '100' })
  firstname: string;

  @Column('varchar', { length: '100' })
  lastname: string;

  @Column('integer')
  age: number;

  @Column('varchar')
  gender: string;

  @Column('varchar')
  photo: string = 'default.png';

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
