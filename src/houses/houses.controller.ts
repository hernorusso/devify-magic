import { Controller, Get } from '@nestjs/common';
import { HousesService } from './houses.service';
import { House } from './house.entity';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Get()
  getHouses(): Promise<House[]> {
    return this.housesService.find();
  }
}
