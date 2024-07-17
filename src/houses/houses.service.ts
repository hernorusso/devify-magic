import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
  ) {}
  findAll(): Promise<House[]> {
    return this.housesRepository.find();
  }
}
