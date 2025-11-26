// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://d3jd5z33zivvds.cloudfront.net',
    ],
    credentials: true,
  });

  // App Runner provides PORT; fall back to BACKEND_PORT/env default for local dev
  const port =
    Number(process.env.PORT) || Number(process.env.BACKEND_PORT) || 3000;

  // App Runner で外から届くように host を 0.0.0.0 にする
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS backend running on port ${port}`);
}
bootstrap();
