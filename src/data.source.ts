import { DataSource, DataSourceOptions } from 'typeorm';

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
