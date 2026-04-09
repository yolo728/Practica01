'use client';

import { useState } from 'react';
import { useUsuarios } from '@/hooks/useUsuarios';
import { Usuario } from '@/types/usuario';
import CreateUsuarioForm from './Create/CreateUsuarioForm';
import UpdateUsuarioForm from './Update/UpdateUsuarioForm';
import UsuariosTable from './View/UsuariosTable';

/**
 * UsuariosPage es el componente ORQUESTADOR de la feature de usuarios.
 *
 * Responsabilidades:
 *   1. Obtener los datos usando el hook useUsuarios.
 *   2. Administrar el "modo" actual: ver lista / crear / editar.
 *   3. Renderizar el subcomponente correspondiente según el modo.
 *   4. Pasar los callbacks (crear, actualizar, eliminar) a los hijos.
 *
 * Los subcomponentes (UsuariosTable, CreateUsuarioForm, UpdateUsuarioForm)
 * NO saben nada del estado global ni del API — solo reciben props y disparan callbacks.
 *
 * Flujo:
 *   modo='view'   → muestra UsuariosTable con botón "Nuevo Usuario"
 *   modo='create' → muestra CreateUsuarioForm
 *   modo='update' → muestra UpdateUsuarioForm con el usuario seleccionado
 */
type Modo = 'view' | 'create' | 'update';

export default function UsuariosPage() {
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios();
  const [modo, setModo] = useState<Modo>('view');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  // --- Handlers ---

  const handleCrear = async (datos: Parameters<typeof crear>[0]) => {
    await crear(datos);
    setModo('view'); // vuelve a la lista tras crear
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModo('update');
  };

  const handleActualizar = async (id: string, datos: Parameters<typeof actualizar>[1]) => {
    await actualizar(id, datos);
    setModo('view'); // vuelve a la lista tras actualizar
    setUsuarioSeleccionado(null);
  };

  const handleEliminar = async (id: string) => {
    if (!confirm(`¿Seguro que deseas eliminar el usuario ${id}?`)) return;
    await eliminar(id);
  };

  const handleCancelar = () => {
    setModo('view');
    setUsuarioSeleccionado(null);
  };

  console.log('Renderizando UsuariosPage con modo:', modo);

  // --- Render ---

  if (loading) return <p className="p-6 text-gray-500">Cargando usuarios...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        {modo === 'view' && (
          <button
            onClick={() => setModo('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Nuevo Usuario
          </button>
        )}
      </div>

      {/* El componente que se muestra depende del "modo" actual */}
      {modo === 'view' && (
        <UsuariosTable
          usuarios={usuarios}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}

      {modo === 'create' && (
        <CreateUsuarioForm onCreate={handleCrear} onCancelar={handleCancelar} />
      )}

      {modo === 'update' && usuarioSeleccionado && (
        <UpdateUsuarioForm
          usuario={usuarioSeleccionado}
          onUpdate={handleActualizar}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}
