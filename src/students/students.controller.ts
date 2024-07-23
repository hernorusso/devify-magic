import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { CreateStudentResponseDto } from './dto/created-student-response.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ description: 'Create a student resource' })
  @ApiConflictResponse({ description: 'The provided key `name` already exist' })
  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<CreateStudentResponseDto> {
    return this.studentsService.create(createStudentDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Return a collection of hogwarts students',
  })
  @Get()
  findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
