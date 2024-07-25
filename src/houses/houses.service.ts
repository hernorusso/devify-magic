import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { House } from './entities/house.entity';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
  ) {}

  find(): Promise<House[]> {
    return this.housesRepository.find();
  }

  async findOneByName(name: string): Promise<House> {
    const result = await this.housesRepository.findOne({
      where: { name: ILike(name) },
      relations: { students: true },
    });
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

  update(house: House) {
    return this.housesRepository.save(house);
  }
}
