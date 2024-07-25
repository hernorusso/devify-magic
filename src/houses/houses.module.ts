import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { House } from './entities/house.entity';

@Module({
  controllers: [HousesController],
  providers: [HousesService],
  imports: [TypeOrmModule.forFeature([House])],
  exports: [HousesService],
})
export class HousesModule {}
