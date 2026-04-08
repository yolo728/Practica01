import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para que el frontend en localhost:3000 pueda llamar a esta API.
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // ValidationPipe activa la validación automática de los DTOs.
  // Sin esto, los decoradores @IsString, @IsEmail, etc. no tendrían efecto.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // El backend corre en el puerto 3001 para no chocar con el frontend (3000).
  await app.listen(3001);
  console.log('Backend NestJS corriendo en http://localhost:3001');
}
bootstrap();
