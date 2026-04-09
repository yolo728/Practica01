import { Usuario } from '@/types/usuario';
import UsuarioRow from './UsuarioRow';

interface Props {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onEliminar: (id: string) => void;
}

/**
 * Renderiza la tabla completa de usuarios.
 * Delega cada fila a UsuarioRow.
 */
export default function UsuariosTable({ usuarios, onEditar, onEliminar }: Props) {
  console.log('Renderizando UsuariosTable con usuarios:', usuarios);
  if (usuarios.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No hay usuarios. ¡Crea el primero!
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Edad</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <UsuarioRow
              key={usuario.id}
              usuario={usuario}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
