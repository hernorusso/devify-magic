import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

// TODO: move this entity to its own folder
@Entity()
export class House {
  @PrimaryColumn()
  name: string;

  @Column()
  motto: string;

  @Column({ name: 'head_of_house' })
  headOfHouse: string;

  @Column({ default: false })
  bravery: boolean;

  @Column({ default: false })
  loyalty: boolean;

  @Column({ default: false })
  intelligence: boolean;

  @Column({ default: false })
  ambition: boolean;

  @OneToMany(() => Student, (student) => student.house)
  students: Student[];
}
