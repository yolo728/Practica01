/**
 * REGLA DE ORO: Las pages solo importan un componente y lo renderizan.
 * Toda la lógica, estado y UI vive en el componente, no aquí.
 *
 * Esta page corresponde a la ruta: /
 */
import HomePage from '@/components/Home/HomePage';

export default function Page() {
  return <HomePage />;
}
