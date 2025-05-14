import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('Conectando ao banco:', process.env.DATABASE_NAME);
}
bootstrap();
