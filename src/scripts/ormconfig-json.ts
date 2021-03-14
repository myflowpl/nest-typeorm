import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import { AppModule } from '../app.module';
import dbConfig from '../db/db.config';

(async function () {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(dbConfig.KEY);

  writeFileSync('ormconfig.json', JSON.stringify(config, null, 2));
})();
