import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { HousesModule } from 'src/houses/houses.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [TypeOrmModule.forFeature([Student]), HousesModule],
})
export class StudentsModule {}
