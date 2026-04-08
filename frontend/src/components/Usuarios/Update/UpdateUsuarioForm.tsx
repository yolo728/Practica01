'use client';

import { useEffect, useState } from 'react';
import { UpdateUsuarioData, Usuario } from '@/types/usuario';

interface Props {
  usuario: Usuario;
  onUpdate: (id: number, datos: UpdateUsuarioData) => Promise<void>;
  onCancelar: () => void;
}

/**
 * Formulario para editar un usuario existente.
 * Recibe el usuario actual para pre-llenar los campos.
 * Igual que CreateUsuarioForm, no llama al API directamente.
 */
export default function UpdateUsuarioForm({ usuario, onUpdate, onCancelar }: Props) {
  const [form, setForm] = useState<UpdateUsuarioData>({
    nombre: usuario.nombre,
    email: usuario.email,
    edad: usuario.edad,
  });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si el usuario seleccionado cambia, actualiza el formulario.
  useEffect(() => {
    setForm({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'edad' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEnviando(true);
      setError(null);
      await onUpdate(usuario.id, form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h2 className="text-xl font-semibold">Editar Usuario #{usuario.id}</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Edad</label>
        <input
          name="edad"
          type="number"
          min={0}
          value={form.edad}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {enviando ? 'Guardando...' : 'Actualizar'}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
