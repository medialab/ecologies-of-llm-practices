# GitHub Static Adaptation Report

Scope: SvelteKit static-hosting readiness audit for GitHub Pages (analysis only, no code changes).

## Static-readiness checklist

- Adapter-static configured: PASS (`svelte.config.js:1`, `svelte.config.js:10`)
- Global prerender enabled: PASS (`src/routes/+layout.server.ts:8`)
- Build succeeds with adapter-static output: PASS (`package.json:11`; build command completed with `Wrote site to "build"`)
- GitHub Actions workflow exists and deploys `build/`: PASS (`.github/workflows/deploy.yml:1`, `.github/workflows/deploy.yml:32`)
- Base-path safety for project-page deployments: FAIL-RISK (`svelte.config.js:7`, `src/app.html:7`)
- Explicit 404 fallback strategy documented/configured: PARTIAL (`svelte.config.js:10`, `svelte.config.js:19`)
- `.nojekyll` explicitly guaranteed for `_app` assets: FAIL-RISK (`build` contains `_app` but no `.nojekyll`; evidence in `build` listing)
- LFS media handling in CI: PASS with caveat (`.gitattributes:1`; `.github/workflows/deploy.yml:17`)
- Large media budget for Pages: FAIL-RISK (`src/lib/media/tedium/TEDIUM_LIGHT.mp4` is ~81 MB)

## Findings (prioritized)

- Severity: HIGH | Risk flag: `gh-pages-subpath-breakage`
  - Issue: The site is configured for root deployment, but several links and preloads are hardcoded to root-relative paths. This breaks if the site is deployed under `https://<user>.github.io/<repo>`.
  - Evidence:
    - `svelte.config.js:7` uses `base: ""`
    - `src/app.html:7` preloads `href="/fonts/InstrumentSans-Regular.woff2"` (same pattern on `src/app.html:8-9`)
    - Root links are hardcoded in UI/navigation (`src/lib/components/header.svelte:15-19`, `src/lib/components/footer.svelte:40`, `src/lib/components/burger.svelte:21`)
  - Recommendation for operational agent:
    - If this is a **project page**, set `kit.paths.base` to the repository subpath and replace root-hardcoded hrefs with base-aware links.
    - If this is a **custom domain root** (CNAME), keep current base but still remove hardcoded `/...` in templates to avoid future migration debt.

- Severity: HIGH | Risk flag: `jekyll-underscore-assets`
  - Issue: Build output contains `_app/` assets and no explicit `.nojekyll` in output. On GitHub Pages, underscore-prefixed paths can be filtered by Jekyll unless disabled.
  - Evidence:
    - `_app` directory present: `build` listing (`build/_app`)
    - No `.nojekyll` file present in `build` root (`ls -la build` output; only `.DS_Store` hidden file shown)
  - Recommendation for operational agent:
    - Ensure deployment always publishes `.nojekyll` (either by generating it during build/deploy or by explicit workflow step).
    - Add a CI assertion that fails if deployed artifact lacks `.nojekyll`.

- Severity: MEDIUM | Risk flag: `spa-fallback-ambiguity`
  - Issue: Adapter-static is used with default options (`adapter({})`) and no explicit fallback file. Current routes are prerenderable, but fallback behavior is not explicit if future client-only routes are introduced.
  - Evidence:
    - Adapter has empty options: `svelte.config.js:10`
    - Prerender errors are handled, but no fallback config present: `svelte.config.js:19-30`
  - Recommendation for operational agent:
    - Keep current setup if all routes remain prerendered.
    - If client-only paths are expected, configure fallback strategy explicitly and document expected 404 behavior.

- Severity: LOW | Risk flag: `media-policy-drift`
  - Issue: Project policy text still says `*.webm` is part of media policy, while current repository media usage is MP4-only.
  - Evidence:
    - `README.md:6` says `*.mp4` and `*.webm` tracked with LFS
    - `.gitattributes:2` still includes `*.webm filter=lfs ...`
    - Current media files found are `.mp4` only
  - Recommendation for operational agent:
    - Align docs and `.gitattributes` with the current MP4-only policy to reduce confusion.

## Required config/workflow changes per file

- `svelte.config.js`
  - Decide and codify deployment target mode:
    - Project page mode: set non-empty `kit.paths.base` and verify all internal links are base-aware.
    - Custom-domain root mode: keep empty base but add a clear comment/doc note that this is root-only.
  - Decide explicit fallback policy (`no fallback` for fully prerendered site vs `fallback` for SPA-like routing).

- `src/app.html`
  - Replace hardcoded root font preload URLs (`/fonts/...`) with base-aware asset paths.

- `src/lib/components/header.svelte`
  - Replace hardcoded absolute internal paths (`/`, `/tedium`, etc.) with base-aware navigation.

- `src/lib/components/footer.svelte`
  - Replace hardcoded internal hrefs (`/inquirers`, `/data-policy`) with base-aware links.

- `src/lib/components/burger.svelte`
  - Replace hardcoded `/#...` and `/route` links with base-aware links.

- `.github/workflows/deploy.yml`
  - Deploy only on push to main (or manual dispatch).
  - Add explicit `.nojekyll` guarantee in deployed artifact.
  - Keep `lfs: true` checkout.

- `README.md`
  - Update deployment assumptions (root vs subpath) and media policy to match repository reality.

## Route-by-route render-mode classification

- `/` (homepage)
  - Mode: prerendered static page with server load data from local modules.
  - Evidence: `src/routes/+layout.server.ts:8`, `src/routes/+page.server.ts:4`, `src/routes/+page.server.ts:12-21`.
  - Static risk: low (no runtime server dependency after build).

- `/artificial_inquiries`
  - Mode: prerendered static page.
  - Evidence: layout prerender global flag (`src/routes/+layout.server.ts:8`), page load in `src/routes/artificial_inquiries/+page.ts:2-20`.
  - Static risk: low.

- `/tedium`
  - Mode: prerendered static page with build-time media module resolution.
  - Evidence: `src/routes/tedium/+page.ts:5-14`, `src/lib/database/media.ts:1-6`, `src/lib/database/media.ts:18-21`.
  - Static risk: medium (payload size, not server incompatibility).

- `/inquirers`
  - Mode: prerendered static page.
  - Evidence: `src/routes/inquirers/+page.ts:4-7` plus global prerender (`src/routes/+layout.server.ts:8`).
  - Static risk: low.

- `/data-policy`
  - Mode: prerendered static page.
  - Evidence: `src/routes/data-policy/+page.ts:35-40` plus global prerender (`src/routes/+layout.server.ts:8`).
  - Static risk: low.

- Error handling (`+error.svelte`)
  - Mode: client-rendered error view, compatible with static output.
  - Evidence: `src/routes/+error.svelte` (no server endpoint dependency).
  - Static risk: depends on host 404 routing behavior if requesting unknown deep links.

## Media and LFS risk list

- LFS is actively used for MP4 assets.
  - Evidence: `.gitattributes:1`, `git lfs ls-files` includes all MP4s.
- Workflow checks out LFS objects (`lfs: true`), which is required and currently correct.
  - Evidence: `.github/workflows/deploy.yml:17`.
- Largest media file is very large for Pages delivery.
  - Evidence: `src/lib/media/tedium/TEDIUM_LIGHT.mp4` (~81 MB).
- Legacy `.webm` LFS tracking remains configured while repository currently contains MP4-only videos.
  - Evidence: `.gitattributes:2`, media inventory scan under `src/` and `static/`.

## Suggested execution order for follow-up operational agent

1. Lock deployment target mode (custom-domain root vs project subpath) and set base-path strategy.
2. Make internal links and preloads base-aware.
3. Harden workflow deploy guard and `.nojekyll` generation/assertion.
4. Keep LFS verification step in CI (fail if pointer files would be deployed).
5. Reduce heavy MP4 footprint or offload to external media hosting.
