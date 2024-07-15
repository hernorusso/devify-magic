import { Injectable } from '@nestjs/common';
import { houseMock } from './house-mock';

@Injectable()
export class HousesService {
  // TODO: Just incremental development, this should be replaced by DB calls
  private houses = [houseMock];

  findAll() {
    return this.houses;
  }
}
