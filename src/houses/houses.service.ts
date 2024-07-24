import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { House } from './entities/house.entity';
import { HouseNameDto } from './dto/house-name.dto';
import { Student } from 'src/students/entities/student.entity';

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

  async findStudentsByHouse(houseName: string): Promise<Student[]> {
    const house = await this.housesRepository.findOne({
      where: { name: ILike(houseName) },
      relations: { students: { house: true } },
    });

    if (!house) {
      throw new NotFoundException(`The house ${houseName} is not found`);
    }

    return house.students;
  }
}
