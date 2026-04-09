import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @Entity le dice a TypeORM que esta clase representa una tabla en la base de datos.
 * Cada propiedad con @Column se convierte en una columna de esa tabla.
 * TypeORM creará automáticamente la tabla "usuarios" en Postgres
 * gracias a que usamos synchronize: true en el módulo raíz (solo para desarrollo).
 */
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  edad!: number;
}
