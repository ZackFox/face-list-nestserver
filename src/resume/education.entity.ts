import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Resume, resume => resume.education, {
    onDelete: 'CASCADE',
  })
  resume: Resume;

  @Column('varchar')
  name: string;

  @Column('varchar')
  speciality: string;

  @Column('timestamp')
  dateStart: string;

  @Column('timestamp')
  dateEnd: string;
}
