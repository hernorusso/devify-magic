import { Module } from '@nestjs/common';
import { HousesModule } from './houses/houses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'devify-magic',
      synchronize: true,
      autoLoadEntities: true,
    }),
    HousesModule,
  ],
})
export class AppModule {}
