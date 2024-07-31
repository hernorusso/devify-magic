import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousesModule } from './houses/houses.module';
import { StudentsModule } from './students/students.module';
import { dataSourceOptions } from './data.source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    HousesModule,
    StudentsModule,
  ],
})
export class AppModule {}
