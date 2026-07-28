# ale-platform

Monorepo privado con módulos reutilizables (agnósticos de framework) para usar
como base de futuros proyectos.

## Setup local

```bash
bun install
```

## Comandos

```bash
bun run lint          # revisa el código con Biome
bun run lint:fix       # corrige lo que se pueda automáticamente
bun run format         # formatea todo el repo
```

## Estructura

```
packages/
  core/     # lógica de negocio pura, sin dependencias de framework
apps/
  (vacío por ahora)
```

Cada paquete nuevo dentro de `packages/` debe:
1. Tener su propio `package.json` con nombre `@ale-platform/<nombre>`.
2. Tener un `tsconfig.json` que haga `"extends": "../../tsconfig.base.json"`.
3. Exportar todo lo público desde `src/index.ts`.

## Usar un paquete dentro de este mismo repo

Solo agregalo como dependencia normal en el `package.json` del paquete/app que
lo necesita:

```json
{
  "dependencies": {
    "@ale-platform/core": "workspace:*"
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
@ale-platform:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Y luego:

```bash
bun add @ale-platform/core
```

## Pendiente / a decidir más adelante

- [ ] `ui` (packages/ui) — decidir framework
- [ ] `apps/playground` — app para testear todos los módulos juntos
- [ ] `packages/db` — cliente de PostgreSQL compartido (Drizzle o Prisma)
- [ ] `packages/forms`, `packages/admin`
