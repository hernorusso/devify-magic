import { IsString } from 'class-validator';

export class HouseNameDto {
  @IsString()
  name: string;
}
