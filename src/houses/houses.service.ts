import { Injectable } from '@nestjs/common';

@Injectable()
export class HousesService {
  // TODO: Just incremental development, this should be replaced by DB calls
  private houses = [
    {
      name: 'houseName',
      motto: 'houseMotto',
      headOfHouse: 'houseHead',
    },
  ];

  findAll() {
    return this.houses;
  }
}
