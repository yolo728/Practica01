import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

/**
 * El Controlador es la "puerta de entrada" de las peticiones HTTP.
 * Su única responsabilidad es:
 *   1. Recibir la petición (método HTTP + URL + body/params)
 *   2. Llamar al servicio correspondiente
 *   3. Devolver la respuesta
 *
 * @Controller('usuarios') hace que todas las rutas de esta clase
 * empiecen con /usuarios.
 */
@Controller('users')
export class UsuariosController {
  /**
   * NestJS inyecta automáticamente UsuariosService aquí.
   * No necesitamos hacer `new UsuariosService()` — NestJS lo administra.
   */
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * POST /usuarios
   * Crea un nuevo usuario.
   * @Body() extrae el cuerpo JSON de la petición y lo convierte en CreateUsuarioDto.
   */
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  /**
   * GET /usuarios
   * Devuelve la lista completa de usuarios.
   */
  @Get("/all")
  findAll() {
    return this.usuariosService.findAll();
  }

  /**
   * GET /usuarios/:id
   * Devuelve un usuario por su id.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  /**
   * PATCH /usuarios/:id
   * Actualiza parcialmente un usuario (solo los campos que lleguen).
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  /**
   * DELETE /usuarios/:id
   * Elimina un usuario.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
