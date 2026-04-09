import { IsString, IsEmail, IsInt,  Min } from 'class-validator';

/**
 * DTO (Data Transfer Object): define la "forma" del cuerpo (body) que debe
 * llegar en el POST /usuarios.
 *
 * NestJS valida automáticamente los datos antes de que lleguen al servicio,
 * gracias al ValidationPipe global y los decoradores de class-validator.
 *
 * Si el body no cumple estas reglas, NestJS responde con 400 Bad Request
 * sin que nosotros tengamos que escribir ningún `if`.
 */
export class CreateUsuarioDto {
  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsInt()
  /*@Min(0)*/
  edad!: number;
}


