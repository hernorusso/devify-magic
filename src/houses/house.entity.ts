import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class House {
  @PrimaryColumn()
  name: string;

  @Column()
  motto: string;

  @Column()
  headOfHouse: string;
}
