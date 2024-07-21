import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  bravery: number;

  @Column()
  loyalty: number;

  @Column()
  intelligence: number;

  @Column()
  ambition: number;

  @Column({ nullable: true })
  @ManyToOne(() => House)
  house: string | null;
}
