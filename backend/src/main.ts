// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔴 ここを追加
  app.enableCors({
    origin: 'http://localhost:5173', // Vite の開発サーバ
    credentials: true,
  });

  const port = process.env.BACKEND_PORT || 3000;
  await app.listen(port);
  console.log(`NestJS backend running on port ${port}`);
}
bootstrap();