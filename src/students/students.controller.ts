import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
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
import { StudentResponseDto } from './dto/response-student.dto';

@ApiTags('students')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ description: 'Create a student resource' })
  @ApiConflictResponse({ description: 'The provided key `name` already exist' })
  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    const result = await this.studentsService.create(createStudentDto);
    return new StudentResponseDto(result);
  }

  @Get()
  async findAll(): Promise<StudentResponseDto[]> {
    const results = await this.studentsService.findAll();
    return results.map((student) => new StudentResponseDto(student));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StudentResponseDto> {
    const result = await this.studentsService.findOne(id);
    return new StudentResponseDto(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    const result = await this.studentsService.update(id, updateStudentDto);
    return new StudentResponseDto(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }
}
