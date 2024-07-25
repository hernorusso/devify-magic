import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { houseAssignation, HousePopulation } from './lib/house-assignation';
import { House } from 'src/houses/entities/house.entity';
import { HousesService } from 'src/houses/houses.service';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private readonly houseService: HousesService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // TODO: In case of having a DB unique constraint, like name, we could catch the error here
    // or check first if the constrained field could be added before saving the new User
    const student = this.studentRepository.create(createStudentDto);
    let result;
    try {
      result = await this.studentRepository.save(student);
    } catch (err) {
      throw new ConflictException(err.detail);
    }
    return result;
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: { house: true } });
  }

  async findOne(id: string): Promise<Student> {
    const result = await this.studentRepository.findOne({
      where: { id },
      relations: { house: true },
    });

    if (!result) {
      throw new NotFoundException(`The student with id: ${id} is not found!`);
    }

    return result;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.findOne(id);
    const updatedStudent = { ...student, ...updateStudentDto };
    // TODO: use assignment algorithm to "re locate" the use student based on data update
    const result = await this.studentRepository.save(updatedStudent);
    return result;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`The student with id: ${id} is not found!`);
    }
  }

  async houseAssignation(id: string) {
    // TODO: Refactor and probably encapsulate this in the house entity
    const student = await this.findOne(id);
    const { bravery, loyalty, intelligence, ambition } = student;
    const skillSet = { bravery, loyalty, intelligence, ambition };
    const houses = await this.houseService.find();

    const promises = [];
    const housesNames = [];
    houses.forEach(async (house, index) => {
      promises[index] = this.studentRepository.count({
        where: { house },
      });
      housesNames[index] = house.name.toLowerCase();
    });

    const counters = await Promise.all(promises);
    const population: HousePopulation = {};
    housesNames.forEach(
      (houseName, index) => (population[houseName] = counters[index]),
    );
    console.log('population', counters, housesNames, population, skillSet);
    const houseName = houseAssignation(skillSet, population);
    console.log('houseName', houseName);

    // const house = houses.find(
    //   (house) => house.name.toLowerCase() === houseName,
    // );
    const house = await this.houseService.findOneByName(houseName);
    console.log(house);
    house.students.push(student);
    await this.houseService.update(house);
    return this.findOne(student.id);
  }
}
