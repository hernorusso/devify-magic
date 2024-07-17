import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
  ) {}

  find(): Promise<House[]> {
    return this.housesRepository.find();
  }

  async findOneBy(name: string): Promise<House> {
    const result = await this.housesRepository.findOneBy({ name });
    if (!result) {
      throw new NotFoundException(`The request house: ${name} is not found!`);
    }
    return result;
  }
}
