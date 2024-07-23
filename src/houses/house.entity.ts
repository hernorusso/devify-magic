import { Column, Entity, PrimaryColumn } from 'typeorm';

// TODO: move this entity to its own folder
@Entity()
export class House {
  @PrimaryColumn()
  name: string;

  @Column()
  motto: string;

  @Column({ name: 'head_of_house' })
  headOfHouse: string;
}
