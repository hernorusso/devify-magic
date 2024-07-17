import { Controller, Get, Param } from '@nestjs/common';
import { HousesService } from './houses.service';
import { House } from './house.entity';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('houses')
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
  getHouseByName(@Param('name') name: string) {
    return this.housesService.findOneByName(name);
  }
}
