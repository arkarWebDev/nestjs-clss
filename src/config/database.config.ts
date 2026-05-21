import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,

  port: parseInt(process.env.DATABASE_PORT!) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || 'localhost',
  name: process.env.DATABASE_NAME,
}));
