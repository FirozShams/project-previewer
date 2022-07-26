import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://project-previewer.vercel.app',
    ],
  });

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
