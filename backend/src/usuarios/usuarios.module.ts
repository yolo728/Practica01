import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

/**
 * El Módulo agrupa todo lo relacionado con "usuarios":
 * controlador, servicio y la entidad que necesita TypeORM.
 *
 * TypeOrmModule.forFeature([Usuario]) registra el repositorio de Usuario
 * para que pueda ser inyectado en UsuariosService con @InjectRepository.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
