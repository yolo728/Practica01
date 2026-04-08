'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import {
  CreateUsuarioData,
  UpdateUsuarioData,
  Usuario,
} from '@/types/usuario';

/**
 * Hook personalizado que encapsula TODA la lógica de datos de usuarios.
 *
 * ¿Por qué un hook?
 *   - Separa el "qué hacer" (lógica) del "cómo mostrarlo" (UI).
 *   - Permite reutilizar esta lógica en cualquier componente sin duplicar código.
 *   - El componente no sabe cómo se llama al API; solo usa las funciones que expone este hook.
 *
 * Retorna:
 *   - usuarios: la lista actual
 *   - loading: true mientras se cargan los datos
 *   - error: mensaje de error si algo falló
 *   - crear, actualizar, eliminar: funciones para modificar los datos
 */
export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch<Usuario[]>('/usuarios');
      setUsuarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial: se ejecuta una vez cuando el componente monta.
  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  const crear = async (datos: CreateUsuarioData) => {
    const nuevo = await apiFetch<Usuario>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(datos),
    });
    // Agrega el nuevo usuario al estado local sin recargar toda la lista.
    setUsuarios((prev) => [...prev, nuevo]);
    return nuevo;
  };

  const actualizar = async (id: number, datos: UpdateUsuarioData) => {
    const actualizado = await apiFetch<Usuario>(`/usuarios/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(datos),
    });
    // Reemplaza el usuario modificado en el estado local.
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? actualizado : u)),
    );
    return actualizado;
  };

  const eliminar = async (id: number) => {
    await apiFetch(`/usuarios/${id}`, { method: 'DELETE' });
    // Filtra el usuario eliminado del estado local.
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return { usuarios, loading, error, crear, actualizar, eliminar, cargarUsuarios };
}
