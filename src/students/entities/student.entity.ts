import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { skillRateValues } from '../student-skills.type';
import { House } from 'src/houses/house.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  bravery: skillRateValues;

  @Column()
  loyalty: skillRateValues;

  @Column()
  intelligence: skillRateValues;

  @Column()
  ambition: skillRateValues;

  @ManyToOne(() => House)
  house: string;
}
