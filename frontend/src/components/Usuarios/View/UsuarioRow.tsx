import { Usuario } from '@/types/usuario';

interface Props {
  usuario: Usuario;
  onEditar: (usuario: Usuario) => void;
  onEliminar: (id: number) => void;
}

/**
 * Representa una fila de la tabla de usuarios.
 * Recibe los datos del usuario y los callbacks para editar/eliminar
 * como props — no llama al API directamente.
 */
export default function UsuarioRow({ usuario, onEditar, onEliminar }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{usuario.id}</td>
      <td className="px-4 py-3">{usuario.nombre}</td>
      <td className="px-4 py-3">{usuario.email}</td>
      <td className="px-4 py-3">{usuario.edad}</td>
      <td className="px-4 py-3 flex gap-2">
        <button
          onClick={() => onEditar(usuario)}
          className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Editar
        </button>
        <button
          onClick={() => onEliminar(usuario.id)}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
