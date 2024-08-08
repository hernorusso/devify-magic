import { DataSource, DataSourceOptions } from 'typeorm';

//TODO: this is still use by the migration script. Look some way to replace it by TypeOrmOptionsFactory
// Meanwhile we could use the dotenv package in this file

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'devify-magic',
  synchronize: false,
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'devify-migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
