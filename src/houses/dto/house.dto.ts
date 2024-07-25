import { HouseNameDto } from './house-name.dto';
import { Exclude } from 'class-transformer';
import { Student } from 'src/students/entities/student.entity';
export class HouseDto extends HouseNameDto {
  motto: string;

  headOfHouse: string;

  @Exclude()
  students: Student[];

  constructor(partial: Partial<HouseDto>) {
    super();
    Object.assign(this, partial);
  }
}
