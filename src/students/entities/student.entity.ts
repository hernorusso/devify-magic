import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { House } from 'src/houses/house.entity';

@Entity()
@Unique(['name']) // TODO:Remove constraint: Uniqueness is not requested in the challenge, but it is added to example that real world use case
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  bravery: number;

  @Column()
  loyalty: number;

  @Column()
  intelligence: number;

  @Column()
  ambition: number;

  @ManyToOne(() => House)
  @JoinColumn({ name: 'house_name', referencedColumnName: 'name' })
  house: House;
}
