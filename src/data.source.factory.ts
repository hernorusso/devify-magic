import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('dataBase.host'),
      port: this.configService.get('dataBase.port'),
      username: this.configService.get('dataBase.user'),
      password: this.configService.get('dataBase.password'),
      database: this.configService.get('dataBase.name'),
      synchronize: false,
      entities: ['dist/**/entities/*.js'],
      migrations: ['dist/**/migrations/*.js'],
      migrationsTableName: 'devify-migrations',
    };
  }
}
