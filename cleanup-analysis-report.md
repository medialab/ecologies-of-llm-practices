# Cleanup Analysis Report

## Executive Summary (Top 5 Cleanup Wins)
1. Remove likely-unused runtime packages in `package.json` to reduce install/build footprint and future upgrade overhead.
2. Add missing quality scripts (`check`, `lint`, `test`) to stop script drift and make verification reproducible.
3. Gate or remove noisy console output in runtime paths (`floaters`, `sharer`, `cardCanvas`) and build-time image processing (`vite.config.js`).
4. Remove stale commented debug code in `cardCanvas.svelte` to improve maintainability.
5. Resolve configuration overlap for browser targets and prerender error handling to avoid split-source behavior.

## Findings (No Tables)

- `F01`
  - Severity: High
  - Category: Dependency hygiene
  - File:Line: `package.json:28-44`, `src/**` import scan
  - Evidence: Several declared deps are not imported from TS/JS/Svelte source (`@adam.plesnik/tailwindcss-scroll-driven-animations`, `@gripeless/pico`, `@lottiefiles/svelte-lottie-player`, `@sveltejs/amp`, `date-fns`, `dropcss`, `lottie-react`, `p5`, `simplebar`).
  - Recommendation: Remove unused packages from manifest/lockfile in a controlled pass.
  - Risk: `manual confirmation required` (dynamic/plugin-only usage could exist outside `src/`).

- `F02`
  - Severity: Medium
  - Category: Script drift
  - File:Line: `package.json:6-11`
  - Evidence: `bun run check`, `bun run lint`, `bun run test` all fail (scripts missing).
  - Recommendation: Add scripts or document intentional omissions and update CI commands.
  - Risk: Medium (quality regressions can slip through).

- `F03`
  - Severity: Medium
  - Category: Logging noise
  - File:Line: `src/lib/components/floaters.svelte:24-35`, `src/lib/components/sharer.svelte:104-161`, `src/lib/components/cardCanvas.svelte:627,1543`, `vite.config.js:12-17`
  - Evidence: Repeated `console.warn`/`console.error` in interactive flows and `console.log` in build plugin path.
  - Recommendation: Gate logs behind debug env flag or replace with structured telemetry/user-safe fallbacks.
  - Risk: Low (behavior unchanged, observability improves).

- `F04`
  - Severity: Low
  - Category: Dead code inventory
  - File:Line: `src/lib/components/cardCanvas.svelte:335`, `src/lib/components/cardCanvas.svelte:1656-1721`, `src/lib/components/cardCanvas.svelte:1750`
  - Evidence: Commented-out debug statements remain in cleanup and floater code paths.
  - Recommendation: Remove commented debug code (`safe to remove`).
  - Risk: None.

- `F05`
  - Severity: Low
  - Category: Unused symbols
  - File:Line: `src/routes/+page.svelte:5`, `src/lib/stores/animeJs.ts:1`
  - Evidence: `fly` and `animate` are imported but not referenced later in their files.
  - Recommendation: Remove unused imports (`safe to remove`) after lint/type pass.
  - Risk: Low.

- `F06`
  - Severity: Medium
  - Category: Tooling/config overlap
  - File:Line: `postcss.config.js:4-12`, `vite.config.js:27-36`, `svelte.config.js:16-26`
  - Evidence: Browser/prerender behavior configured in multiple places (`overrideBrowserslist`, `build.target`, prerender HTTP handling in two config files).
  - Recommendation: Consolidate ownership of browser/prerender policy and keep one authoritative source.
  - Risk: `manual confirmation required` (policy choice affects compatibility/build behavior).

- `F07`
  - Severity: Low
  - Category: Package-manager consistency
  - File:Line: root lockfile inventory (`bun.lock`)
  - Evidence: Only `bun.lock` is present; no npm/yarn/pnpm lockfiles found at repo root.
  - Recommendation: Keep Bun as de-facto manager and avoid introducing additional lockfiles.
  - Risk: None.

- `F08`
  - Severity: Low
  - Category: Tracked artifacts/ignore hygiene
  - File:Line: `.gitignore:11-17`, `.gitignore:62-71`, `git ls-files` artifact scan
  - Evidence: Build/cache paths are ignored and not tracked (`build/`, `.svelte-kit/`, `dist/`, `node_modules/`).
  - Recommendation: Keep current ignore rules; no immediate cleanup needed here.
  - Risk: None.

## Detailed Findings

### 1) Dead Code Inventory

- **F04 / safe to remove**: Commented debug statements in `cardCanvas.svelte` are stale and non-executable.
  - `src/lib/components/cardCanvas.svelte:335`
  - `src/lib/components/cardCanvas.svelte:1656-1721`
  - `src/lib/components/cardCanvas.svelte:1750`
- **Evidence excerpt**: `//console.log("openFloaters");`, `// console.log("Could not ...")`, `//console.log("Component cleanup complete");`
- **Risk flag**: None.

### 2) Logging Noise Map

- **Startup/build area**
  - `vite.config.js:12-17`: build-time image plugin logs every processed image/directive.
- **Hot interaction paths**
  - `src/lib/components/floaters.svelte:24-35`: warns when `.floater_container` lookup fails.
  - `src/lib/components/sharer.svelte:104-161`: error logging in share/copy paths.
  - `src/lib/components/cardCanvas.svelte:627,1543`: warnings/errors during font preloading and floater init.
- **Recommendation**
  - Use a central debug gate (e.g., `import.meta.env.DEV`), keep actionable error logs only, and avoid routine warning spam.
- **Risk flag**: Low.

### 3) Unused Symbols

- **F05 / safe to remove**:
  - `src/routes/+page.svelte:5`: `fly` imported from `svelte/transition` but not used.
  - `src/lib/stores/animeJs.ts:1`: `animate` imported from `animejs` but not used.
- **Risk flag**: Low.

### 4) Dependency Usage Map and Drift

- **F01 likely-unused dependencies**:
  - Declared in `package.json:28-44`; no corresponding import usage found in TS/JS/Svelte sources.
  - Import scan confirms active runtime deps include `animejs`, `interactjs`, `locomotive-scroll`, `turndown`, while listed packages above are absent from code imports.
- **Notes on evidence quality**:
  - A plain text search for `p5` can match embedded media payloads (e.g., SVG/base64), so import-based evidence was used for this finding.
- **Risk flag**: `manual confirmation required` before removal.

### 5) Dependency Conflicts / Redundancies

- **No hard version conflicts found** in lockfile resolution from current read-only inspection.
- **F06 overlap risk**:
  - Browser compatibility policy appears in both `postcss.config.js` and `vite.config.js`.
  - Prerender HTTP error handling logic appears in both `svelte.config.js` and `vite.config.js`.
- **Recommendation**:
  - Choose one owner per concern (browser matrix, prerender error policy), then remove duplicate/secondary declarations.
- **Risk flag**: `manual confirmation required`.

### 6) Package Manager Consistency

- **F07**: Repository is Bun-first (`bun.lock` present, no other lockfiles found).
- **Recommendation**: Keep Bun-only lockfile policy to prevent dependency drift.
- **Risk flag**: None.

### 7) Script Drift

- **F02**: Missing expected quality scripts in `package.json:6-11`.
- **Observed command outcomes**:
  - `bun run check` -> `Script not found "check"`
  - `bun run lint` -> `Script not found "lint"`
  - `bun run test` -> script not found
  - `bun run build` -> succeeds
- **Recommendation**:
  - Add `check/lint/test` scripts or update team docs/CI to avoid calling absent commands.
- **Risk flag**: Medium.

### 8) Tooling Config Overlap / Deprecated Surface

- **F06**: `vite.config.js:33-36` includes a `kit` block while `svelte.config.js` is already the canonical place for SvelteKit kit options.
- **Recommendation**:
  - Validate whether the `vite.config.js` `kit` subtree is intentional/effective; if not, remove it and centralize in `svelte.config.js`.
- **Risk flag**: `manual confirmation required`.

### 9) Tracked Artifacts and Ignore Rules

- **F08**: No tracked generated artifacts found in `build/`, `.svelte-kit/`, `node_modules/`, `dist/` from read-only git scan.
- **Recommendation**: Keep `.gitignore` as-is; periodic check is sufficient.
- **Risk flag**: None.

## Suggested Execution Order
1. Add/normalize `check`, `lint`, and `test` scripts (`F02`) so cleanup validation becomes deterministic.
2. Remove low-risk dead code and unused imports (`F04`, `F05`) and run quality scripts.
3. Gate or remove runtime/build logging noise (`F03`) and verify UX/build logs are clean.
4. Prune likely-unused dependencies (`F01`) in small batches, validating each batch with build and route smoke checks.
5. Consolidate overlapping config ownership (`F06`) for browser and prerender behavior.
6. Reconfirm package-manager and artifact hygiene (`F07`, `F08`).

## Verification Checklist (Commands to Re-run)
- `bun pm ls`
- `bun run build`
- `bun run check`
- `bun run lint`
- `bun run test`
- `rg -n "console\\.(log|warn|error|debug|info)" src vite.config.js`
- `rg -n "//\\s*console\\.|//console\\." src`
- `rg -n "from \"(animejs|interactjs|locomotive-scroll|turndown)\"|import\(" src --glob "*.{ts,js,svelte}"`
- `git ls-files | rg "^(build|dist|\\.svelte-kit|node_modules)/" || true`
