import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HouseNameDto {
  // TODO: update the house name
  @ApiProperty({ example: 'Griff', description: 'Name of the house' })
  @IsString()
  name: string;
}
