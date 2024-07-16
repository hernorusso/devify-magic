import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './house.entity';

@Module({
  controllers: [HousesController],
  providers: [HousesService],
  imports: [TypeOrmModule.forFeature([House])],
})
export class HousesModule {}
