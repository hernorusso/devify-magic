import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { HouseNameDto } from 'src/houses/dto/house-name.dto';

export class StudentResponseDto {
  id: string;
  name: string;
  age: number;
  bravery: number;
  loyalty: number;
  intelligence: number;
  ambition: number;

  @Transform(({ value }) => value?.name || value)
  @IsOptional()
  house: HouseNameDto;

  constructor(partial: Partial<StudentResponseDto>) {
    Object.assign(this, partial);
  }
}
