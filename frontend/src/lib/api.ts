/**
 * Cliente HTTP base para comunicarse con el backend.
 *
 * Centraliza la URL base y los headers comunes.
 * Todos los hooks usan esta función en lugar de llamar a fetch() directamente.
 * Así, si cambia la URL del API, solo hay que cambiarla aquí.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message ?? `Error ${response.status}`);
  }

  // DELETE devuelve un objeto con mensaje; otras respuestas devuelven datos.
  return response.json() as Promise<T>;
}
