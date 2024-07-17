import { Controller, Get } from '@nestjs/common';
import { HousesService } from './houses.service';
import { House } from './house.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
}
