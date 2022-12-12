import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constans';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  const config_service=app.get(ConfigService);
  const port = +config_service.get<number>(SERVER_PORT);
  await app.listen(port);
}
bootstrap();
