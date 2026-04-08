import Link from 'next/link';

/**
 * Componente principal de la página de inicio.
 * La page.tsx importa este componente y lo renderiza — nada más.
 */
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 p-12 gap-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600">Practica01</h1>
      <p className="text-gray-600 max-w-lg">
        Proyecto guía: Next.js + NestJS + API simple en Express.
        Explora el CRUD de usuarios para ver cómo se conecta el frontend con el backend.
      </p>
      <Link
        href="/usuarios"
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Ver Usuarios
      </Link>
    </main>
  );
}
