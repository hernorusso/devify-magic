import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HousesModule } from './houses/houses.module';
import { StudentsModule } from './students/students.module';
import dbConfig from './config/db.config';
import { TypeOrmConfigService } from './data.source.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    HousesModule,
    StudentsModule,
  ],
})
export class AppModule {}
