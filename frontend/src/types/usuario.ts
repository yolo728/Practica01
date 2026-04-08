/**
 * Define la forma (shape) de un objeto Usuario en el frontend.
 * Debe coincidir con la entidad del backend.
 */
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

/**
 * Lo que se envía al crear un usuario (sin id, porque la BD lo genera).
 */
export type CreateUsuarioData = Omit<Usuario, 'id'>;

/**
 * Lo que se envía al actualizar: todos los campos son opcionales.
 */
export type UpdateUsuarioData = Partial<CreateUsuarioData>;
