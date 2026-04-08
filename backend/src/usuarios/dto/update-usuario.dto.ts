import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

/**
 * PartialType(CreateUsuarioDto) genera automáticamente una clase donde
 * todos los campos de CreateUsuarioDto son opcionales (partial).
 * Así solo envías los campos que quieres actualizar en el PATCH.
 *
 * Ejemplo: { "email": "nuevo@email.com" } es un body válido aquí,
 * pero no lo sería en CreateUsuarioDto donde todos los campos son obligatorios.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
