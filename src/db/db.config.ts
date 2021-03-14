import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('db', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  // autoLoadEntities: true,
  entities: [join(__dirname, '**', '/*.entity{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
}));
