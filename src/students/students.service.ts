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
import { CreateStudentResponseDto } from './dto/created-student-response.dto';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<CreateStudentResponseDto> {
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
}
