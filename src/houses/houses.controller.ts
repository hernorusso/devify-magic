import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HousesService } from './houses.service';
import { House } from './entities/house.entity';
import { HouseNameDto } from './dto/house-name.dto';
import { StudentResponseDto } from 'src/students/dto/response-student.dto';
import { HouseDto } from './dto/house.dto';

@ApiTags('houses')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @ApiResponse({
    status: 200,
    description: 'Return a collection of hogwarts houses',
  })
  @Get()
  getHouses(): Promise<House[]> {
    return this.housesService.find();
  }

  @ApiResponse({
    status: 200,
    description: 'Return the required hogwarts house',
  })
  @ApiNotFoundResponse({
    description: 'The request house: `name` is not found!',
  })
  @Get(':name')
  async getHouseByName(@Param('name') name: string): Promise<HouseDto> {
    const house = await this.housesService.findOneByName(name);
    return new HouseDto(house);
  }

  @Get(':name/students')
  async getStudentsByHouseName(
    @Param('name') name: string,
  ): Promise<StudentResponseDto[]> {
    const students = await this.housesService.findStudentsByHouse(name);
    return students.map((student) => new StudentResponseDto(student));
  }
}
