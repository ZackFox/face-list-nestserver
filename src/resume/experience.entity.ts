import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Resume, resume => resume.experience, {
    onDelete: 'CASCADE',
  })
  resume: Resume;

  @Column('varchar')
  name: string;

  @Column('varchar')
  position: string;

  @Column('text')
  description: string;

  @Column('timestamp')
  dateStart: string;

  @Column('timestamp')
  dateEnd: string;
}
