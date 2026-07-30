import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  const dataSource = await new DataSource({
    type: 'postgres',
    synchronize: config.get('database.synchronize'),
    port: +config.get('database.port')!,
    username: config.get('database.username')!,
    password: config.get('database.password')!,
    host: config.get('database.host')!,
    database: config.get('database.name')!,
  }).initialize();

  await dataSource.dropDatabase();

  await dataSource.destroy();
}
