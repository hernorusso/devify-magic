import { Transform } from 'class-transformer';
import { House } from 'src/houses/house.entity';

export class StudentResponseDto {
  id: string;
  name: string;
  age: number;
  bravery: number;
  loyalty: number;
  intelligence: number;
  ambition: number;

  @Transform(({ value }) => value?.name || value)
  house: House;

  constructor(partial: Partial<StudentResponseDto>) {
    Object.assign(this, partial);
  }
}
