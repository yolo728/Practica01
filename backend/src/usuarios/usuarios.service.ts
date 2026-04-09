import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

/**
 * El Servicio contiene toda la LÓGICA DE NEGOCIO.
 * El controlador recibe la petición HTTP y delega el trabajo al servicio.
 * El servicio NO sabe nada de HTTP: solo trabaja con datos.
 *
 * @Injectable() permite que NestJS inyecte este servicio en otros lugares
 * (como el controlador) sin que nosotros creemos una instancia con `new`.
 */
@Injectable()
export class UsuariosService {
  /**
   * @InjectRepository(Usuario) inyecta el repositorio de TypeORM para
   * la entidad Usuario. El repositorio es el objeto que habla con la base
   * de datos (SELECT, INSERT, UPDATE, DELETE).
   */
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  /** Crea un nuevo usuario y lo guarda en la base de datos. */
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(nuevoUsuario);
  }

  /** Devuelve todos los usuarios. */
  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  /** Busca un usuario por id. Lanza 404 si no existe. */
  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  /** Actualiza un usuario. Solo modifica los campos que lleguen en el DTO. */
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id); // lanza 404 si no existe
    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }

  /** Elimina un usuario por id. */
  async remove(id: string): Promise<{ mensaje: string }> {
    const usuario = await this.findOne(id); // lanza 404 si no existe
    await this.usuariosRepository.remove(usuario);
    return { mensaje: `Usuario con id ${id} eliminado correctamente` };
  }
}
