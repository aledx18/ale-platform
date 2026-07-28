# authkit

Sistema completo de autenticación modular y agnóstico de framework.

## Setup local

```bash
bun install
```

## Comandos

```bash
bun run build          # buildea todos los paquetes (core → auth)
bun run dev            # buildea y ejecuta lab
bun run typecheck      # verifica tipos con tsc --build
bun run lint           # revisa el código con Biome
bun run lint:fix       # corrige lo que se pueda automáticamente
bun run format         # formatea todo el repo
```

## Estructura

```
packages/
  core/     # lógica de negocio pura, sin dependencias de framework
  auth/     # módulo de autenticación (depende de core)
apps/
  lab/      # playground para testear módulos
```

Cada paquete nuevo dentro de `packages/` debe:
1. Tener su propio `package.json` con nombre `@aledx18/<nombre>`.
2. Tener un `tsconfig.json` que haga `"extends": "../../tsconfig.base.json"`.
3. Agregar `"references"` en su `tsconfig.json` si depende de otros paquetes.
4. Agregarlo al root `tsconfig.json` en `"references"`.
5. Exportar todo lo público desde `src/index.ts`.

## Usar un paquete dentro de este mismo repo

Solo agregalo como dependencia normal en el `package.json` del paquete/app que
lo necesita:

```json
{
  "dependencies": {
    "@aledx18/core": "workspace:*"
  }
}
```

Bun resuelve `workspace:*` con un symlink local, sin tocar la red.

## Publicar a GitHub Packages (para usar en otros repos)

1. Generá un Personal Access Token (classic) con permisos `read:packages` y
   `write:packages`.
2. Exportalo como variable de entorno local:
   ```bash
   export GITHUB_TOKEN=tu_token
   ```
3. Para publicar manualmente un paquete:
   ```bash
   cd packages/core
   npm publish
   ```
4. Para publicar automáticamente: creá un tag `v*` (ej. `v0.0.1`) y pusheálo.
   El workflow `.github/workflows/publish.yml` se encarga del resto.

## Consumir desde otro repositorio

En el repo externo, agregá un `.npmrc`:

```
@aledx18:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Y luego:

```bash
bun add @aledx18/core
```

## Pendiente / a decidir más adelante

- [ ] `packages/ui` — decidir framework
- [ ] `packages/db` — cliente de PostgreSQL compartido (Drizzle o Prisma)
- [ ] `packages/admin` — panel de administración
