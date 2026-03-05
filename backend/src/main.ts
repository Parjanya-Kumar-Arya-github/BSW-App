import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookies from 'cookie-parser'; // Import cookie-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Register Cookie Parser
  app.use(cookies.default());

  // 2. Configure CORS correctly
  app.enableCors({
    origin:['http://localhost:5173','http://localhost:3001', 'http://localhost', 'capacitor://localhost', 'http://localhost:3000'], 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();