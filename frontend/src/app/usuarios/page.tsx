/**
 * REGLA DE ORO: Las pages solo importan un componente y lo renderizan.
 * Toda la lógica, estado y UI vive en el componente, no aquí.
 *
 * Esta page corresponde a la ruta: /usuarios
 *
 * UsuariosPage es el componente "orquestador" que maneja:
 *   - Carga de datos (via useUsuarios hook)
 *   - Cambio entre vista / crear / editar
 *   - Subcomponentes: UsuariosTable, CreateUsuarioForm, UpdateUsuarioForm
 */
import UsuariosPage from '@/components/Usuarios/UsuariosPage';

export default function Page() {
  return <UsuariosPage />;
}
