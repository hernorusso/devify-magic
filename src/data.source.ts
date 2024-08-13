import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: +`${process.env.DB_PORT}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB}`,
  synchronize: false,
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'devify-migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
