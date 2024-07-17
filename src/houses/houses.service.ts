import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './house.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
  ) {}

  find(): Promise<House[]> {
    return this.housesRepository.find();
  }

  async findOneByName(name: string): Promise<House> {
    const result = await this.housesRepository.findOneBy({ name: ILike(name) });
    if (!result) {
      throw new NotFoundException(`The request house: ${name} is not found!`);
    }
    return result;
  }
}
