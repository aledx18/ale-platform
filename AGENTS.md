# authkit Agent Guide

## Workspace

- This Bun monorepo contains `packages/core` (framework-agnostic logic), `packages/auth` (depends on core), and `apps/lab` (private playground depending on both). Keep dependencies flowing `core -> auth -> lab`.
- Public package APIs are exported from each package's `src/index.ts`.
- Internal dependencies use `"workspace:*"`.

## Commands

Run from the repository root:

```bash
bun install
bun run lint
bun run typecheck
bun run build
bun run dev
```

- `bun run build` builds `@aledx18/core`, `@aledx18/auth`, and `@aledx18/react`; `bun run dev` builds them and starts the Vite lab.
- Focused commands: `bun run --filter='@aledx18/core' build`, `bun run --filter='@aledx18/core' typecheck`, and `bun run --filter='@aledx18/lab' start`.
- There is no test runner or automated test suite yet.
- Biome is authoritative for linting and formatting. Use `bun run lint:fix` or `bun run format` only when intentionally applying automated edits.

## TypeScript Packages

- TypeScript uses strict composite project references. When adding a package, extend `../../tsconfig.base.json`, add references for its internal dependencies, and add the package to root `tsconfig.json` references.
- New packages under `packages/` use the `@aledx18/<name>` scope and expose their public API from `src/index.ts`.

## Releases

- Changesets manages package releases. The GitHub workflow runs on pushes to `main`, builds `packages/*`, then opens a release PR or publishes to GitHub Packages. Do not rely on the README's tag-trigger statement; the workflow is the source of truth.
