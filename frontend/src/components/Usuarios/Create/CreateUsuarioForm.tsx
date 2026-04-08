'use client';

import { useState } from 'react';
import { CreateUsuarioData } from '@/types/usuario';

interface Props {
  onCreate: (datos: CreateUsuarioData) => Promise<void>;
  onCancelar: () => void;
}

/**
 * Formulario para crear un nuevo usuario.
 * Recibe una función `onCreate` como prop — no llama al API directamente.
 * El componente padre (UsuariosPage) decide qué hacer con los datos.
 */
export default function CreateUsuarioForm({ onCreate, onCancelar }: Props) {
  const [form, setForm] = useState<CreateUsuarioData>({
    nombre: '',
    email: '',
    edad: 0,
  });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      await onCreate(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear usuario');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h2 className="text-xl font-semibold">Crear Usuario</h2>

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
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {enviando ? 'Guardando...' : 'Crear'}
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
