# Practica01 — Proyecto Guía Frontend + Backend

Proyecto educativo que muestra cómo se conecta un frontend con un backend
a través del mismo CRUD de usuarios, implementado de tres formas distintas.

---

## Estructura

```
Practica01/
├── frontend/           → Next.js 14 (App Router) + Tailwind CSS
├── backend/            → NestJS + TypeORM + PostgreSQL  (puerto 3001)
└── ComoFuncionaUnAPI/  → Express + Sequelize + PostgreSQL (puerto 4000)
```

---

## Orden de estudio recomendado

1. **`ComoFuncionaUnAPI`** — Empieza aquí. Es la versión más simple:
   Express puro en JavaScript, sin decoradores ni magia. Ves exactamente
   cómo fluye una petición: `ruta → controlador → modelo → base de datos`.

2. **`backend`** — Después mira NestJS. Hace lo mismo que Express pero
   de forma más estructurada y con inyección de dependencias. Compara
   cada archivo con su equivalente en ComoFuncionaUnAPI.

3. **`frontend`** — Por último el frontend. Observa cómo las `page.tsx`
   son cascarones vacíos y toda la lógica vive en componentes organizados
   por feature (`Usuarios/Create`, `Usuarios/View`, etc.).

---

## Pre-requisitos

- Node 20+
- PostgreSQL corriendo localmente
- Crear las dos bases de datos:

```sql
CREATE DATABASE practica_nest;
CREATE DATABASE practica_simple;
```

---

## Cómo correr cada proyecto

### 1. API simple (ComoFuncionaUnAPI)
```bash
cd ComoFuncionaUnAPI
# Edita .env con tu usuario/contraseña de Postgres
npm run dev
# → http://localhost:4000
```

### 2. Backend NestJS
```bash
cd backend
# Edita .env con tu usuario/contraseña de Postgres
npm run start:dev
# → http://localhost:3001
```

### 3. Frontend Next.js
```bash
cd frontend
npm run dev
# → http://localhost:3000
```

> El frontend consume el backend NestJS (`:3001`).
> Asegúrate de que el backend esté corriendo antes de abrir el frontend.

---

## Endpoints del CRUD de Usuarios

Ambas APIs exponen los mismos endpoints (en diferentes puertos):

| Método | Ruta           | Descripción              |
|--------|----------------|--------------------------|
| GET    | /usuarios      | Lista todos los usuarios |
| GET    | /usuarios/:id  | Obtiene un usuario       |
| POST   | /usuarios      | Crea un usuario          |
| PATCH  | /usuarios/:id  | Actualiza un usuario     |
| DELETE | /usuarios/:id  | Elimina un usuario       |

**Body para crear/actualizar:**
```json
{
  "nombre": "Ana García",
  "email": "ana@email.com",
  "edad": 25
}
```

---

## Arquitectura del Frontend

```
page.tsx           ← CASCARÓN: solo importa y renderiza el componente
    └── UsuariosPage.tsx    ← ORQUESTADOR: maneja estado y modo (view/create/update)
            ├── UsuariosTable.tsx    ← Vista de la lista
            │       └── UsuarioRow.tsx
            ├── CreateUsuarioForm.tsx
            └── UpdateUsuarioForm.tsx
```

La lógica de llamadas al API vive en `src/hooks/useUsuarios.ts`.
El cliente HTTP base está en `src/lib/api.ts`.
