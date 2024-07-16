import { Controller, Get } from '@nestjs/common';
import { HousesService } from './houses.service';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Get()
  getHouses() {
    return this.housesService.findAll();
  }
}
