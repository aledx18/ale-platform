# authkit

Kit de autenticación para Supabase con dos capas:

- **`@aledx18/supabase-auth-core`**: capa JS pura, framework-agnostic (login, logout, signup). Funciona en Astro, Express, Hono, Vite SSR, vanilla JS.
- **`@aledx18/supabase-auth-react`**: capa React con provider, hooks y componentes UI. Depende del core.

El consumidor trae su propio cliente `@supabase/supabase-js` (peer dependency de ambos paquetes).

## Setup local

```bash
bun install
```

## Comandos

```bash
bun run build          # buildea packages/*
bun run dev            # buildea y ejecuta lab
bun run typecheck      # verifica tipos con tsc --build
bun run lint           # revisa el código con Biome
bun run lint:fix       # corrige lo que se pueda automáticamente
bun run format         # formatea todo el repo
```

## Uso rápido (React)

```tsx
import { createClient } from "@supabase/supabase-js";
import {
  AuthProvider,
  RequireAuth,
  SignIn,
  UserButton,
} from "@aledx18/supabase-auth-react";
import "@aledx18/supabase-auth-react/styles.css";

const supabase = createClient(url, anonKey);

export function App() {
  return (
    <AuthProvider supabase={supabase}>
      <RequireAuth fallback={<SignIn />}>
        <UserButton />
        {/* app protegida */}
      </RequireAuth>
    </AuthProvider>
  );
}
```

## Uso rápido (JS puro / framework-agnostic)

```ts
import { createClient } from "@supabase/supabase-js";
import { createAuthClient } from "@aledx18/supabase-auth-core";

const supabase = createClient(url, anonKey);
const auth = createAuthClient({ supabase });

const { error } = await auth.login("user@example.com", "password");
if (error) {
  console.error(error);
}
```

## Estructura

```
packages/
  supabase-auth-core/    # @aledx18/supabase-auth-core (JS puro)
  supabase-auth-react/   # @aledx18/supabase-auth-react (React)
apps/
  lab/                   # playground Vite (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
```

Cada paquete nuevo dentro de `packages/` debe:
1. Tener su propio `package.json` con nombre `@aledx18/<nombre>`.
2. Tener un `tsconfig.json` que haga `"extends": "../../tsconfig.base.json"`.
3. Agregar `"references"` en su `tsconfig.json` si depende de otros paquetes.
4. Agregarlo al root `tsconfig.json` en `"references"`.
5. Exportar todo lo público desde `src/index.ts`.

## Usar un paquete dentro de este mismo repo

```json
{
  "dependencies": {
    "@aledx18/supabase-auth-react": "workspace:*"
  }
}
```

## Publicar a GitHub Packages

El workflow `.github/workflows/publish.yml` corre en pushes a `main`: buildea `packages/*` y usa Changesets para abrir una release PR o publicar.

## Consumir desde otro repositorio

En el repo externo, agregá un `.npmrc`:

```
@aledx18:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Y luego:

```bash
bun add @supabase/supabase-js @aledx18/supabase-auth-react
```
