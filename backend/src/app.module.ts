import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';

/**
 * AppModule es el módulo raíz de la aplicación.
 * Aquí se configuran los módulos globales (base de datos, variables de entorno)
 * y se importan los módulos de cada feature (UsuariosModule, etc.).
 */
@Module({
  imports: [
    // ConfigModule carga el archivo .env y hace las variables disponibles
    // en toda la aplicación a través de ConfigService.
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeOrmModule.forRootAsync conecta NestJS con PostgreSQL.
    // Usamos "async" para poder leer los valores del .env con ConfigService.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: true crea/actualiza las tablas automáticamente.
        // ¡Solo usar en desarrollo! En producción usa migraciones.
        synchronize: true,
      }),
    }),

    UsuariosModule,
  ],
})
export class AppModule {}
