import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // TODO: In case of having a DB unique constraint, like name, we could catch the error here
    // or check first if the constrained field could be added before saving the new User
    const student = this.studentRepository.create(createStudentDto);
    const result = await this.studentRepository.save(student);
    return result;
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    const result = await this.studentRepository.findOneBy({ id });

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
    const result = await this.studentRepository.save(updatedStudent);
    return result;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`The student with id: ${id} is not found!`);
    }
  }
}
