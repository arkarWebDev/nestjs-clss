import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'password',
  host: 'localhost',
  database: 'nest-app-production',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
