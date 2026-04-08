import Link from 'next/link';

/**
 * Barra de navegación compartida por toda la aplicación.
 * Se incluye en el layout raíz para que aparezca en todas las páginas.
 */
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center gap-6">
      <span className="font-bold text-lg">Practica01</span>
      <Link href="/" className="hover:underline">
        Inicio
      </Link>
      <Link href="/usuarios" className="hover:underline">
        Usuarios
      </Link>
    </nav>
  );
}
