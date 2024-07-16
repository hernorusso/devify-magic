import { Module } from '@nestjs/common';
import { HousesModule } from './houses/houses.module';

@Module({
  imports: [HousesModule],
})
export class AppModule {}
