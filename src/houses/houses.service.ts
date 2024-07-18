import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { House } from './house.entity';
import { HouseNameDto } from './dto/house-name.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
  ) {}

  find(): Promise<House[]> {
    return this.housesRepository.find();
  }

  async findOneByName(houseNameDto: HouseNameDto): Promise<House> {
    const { name } = houseNameDto;
    const result = await this.housesRepository.findOneBy({ name: ILike(name) });
    if (!result) {
      throw new NotFoundException(`The request house: ${name} is not found!`);
    }
    return result;
  }
}
