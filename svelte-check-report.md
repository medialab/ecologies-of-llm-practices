# Svelte Check Report

## Best-Practice Mismatches

- `SC-01`
  - Severity: Medium
  - Area: Route/component data shape consistency
  - File:Line: `src/routes/inquirers/+page.svelte:8`, `src/routes/inquirers/+page.svelte:79`, `src/routes/inquirers/+page.ts:4`
  - Evidence excerpt:
    - `let data = $props();`
    - `{#each data.data.inquirers as name, i}`
    - `export function load({ params }) { ... }` (`params` unused)
  - Why it matters: `data.data.*` access and untyped `$props()` increase fragility and make refactors error-prone.
  - Recommendation for follow-up agent: Switch to typed destructuring (`let { data } = $props();` with `PageProps`), remove unused `params`, and flatten access to `data.inquirers`.
  - Risk flag: Low.

- `SC-02`
  - Severity: Medium
  - Area: Error/redirect patterns
  - File:Line: `src/routes/+error.svelte:6-11`
  - Evidence excerpt:
    - `// Handle 301 redirects`
    - `if ($page.status === 301) { window.location.href = '...' }`
  - Why it matters: Redirect logic inside `+error.svelte` is client-only and runs after hydration; SSR/prerender redirects should be handled in `load`/hooks with `redirect(...)`.
  - Recommendation for follow-up agent: Remove 301 redirect logic from `+error.svelte` and implement canonical redirect flow in server `load`/hook.
  - Risk flag: Medium (`manual confirmation required` for intended redirect policy).

- `SC-03`
  - Severity: Low
  - Area: CSS diagnostics quality
  - File:Line: `src/lib/components/floaters.svelte:181`, `src/lib/components/floaters.svelte:188`, `src/lib/components/floaters.svelte:193` (and repeated similar lines through `:328`)
  - Evidence excerpt:
    - `Warn: Unknown at rule @apply (css)` from `bun run check`
  - Why it matters: Signal-to-noise drops in diagnostics; true issues can be masked by repeated style-parser warnings.
  - Recommendation for follow-up agent: Align Svelte style tooling with Tailwind `@apply` usage (or migrate repeated `@apply` blocks where practical).
  - Risk flag: Low.

## SSR/CSR Boundary Risks

- `SC-04`
  - Severity: High
  - Area: Load boundaries and render availability
  - File:Line: `src/routes/+page.svelte:108-136`, `src/routes/+page.svelte:244-313`, `src/routes/+page.svelte:332-334`
  - Evidence excerpt:
    - Heavy data and component are loaded only in `onMount` via dynamic imports.
    - Core sections are gated behind `{#if heavyData}` and `{#if CardCanvasComponent && heavyData}`.
  - Why it matters: Home content is not available until client JS runs; this weakens SSR/prerender value and can create content gaps for crawlers/slow clients.
  - Recommendation for follow-up agent: Move critical content/data load to `+page.server.ts` / `+page.ts` and keep only non-critical interactive modules lazy.
  - Risk flag: High (`manual confirmation required` for performance vs. SEO tradeoff).

- `SC-05`
  - Severity: Medium
  - Area: Global security headers vs. runtime assets
  - File:Line: `src/hooks.server.js:33-35`, `src/routes/+layout.svelte:143-151`
  - Evidence excerpt:
    - `Cross-Origin-Embedder-Policy: require-corp`
    - External analytics script loaded in layout head (`googletagmanager`).
  - Why it matters: Strict cross-origin isolation can block third-party resources unless all responses satisfy required policies.
  - Recommendation for follow-up agent: Validate every external asset against COEP/COOP policy; relax or scope headers if incompatibilities are found.
  - Risk flag: Medium (`manual confirmation required`).

- `SC-06`
  - Severity: Medium
  - Area: Route transition side-effects
  - File:Line: `src/routes/+layout.svelte:72-79`
  - Evidence excerpt:
    - `$effect` schedules `setTimeout(...scrollTo...)` without cancellation.
  - Why it matters: Repeated rapid route/hash changes can queue stale scroll calls and produce non-deterministic navigation behavior.
  - Recommendation for follow-up agent: Store timer id and cancel on effect re-run/cleanup.
  - Risk flag: Medium.

## Rune-Specific Issues

- `SC-07`
  - Severity: Medium
  - Area: `$effect` lifecycle discipline
  - File:Line: `src/routes/+layout.svelte:56-62`, `src/routes/+layout.svelte:72-79`
  - Evidence excerpt:
    - Effect chains `tick().then(heroAnimation)` and timeout-based scrolling without explicit teardown.
  - Why it matters: Runes-based effects should explicitly clean asynchronous work to avoid stale closures and out-of-order UI effects.
  - Recommendation for follow-up agent: Add cleanup patterns (`cancelled` flag / timeout clear) inside effects.
  - Risk flag: Medium.

- `SC-08`
  - Severity: Medium
  - Area: Special element cleanup correctness
  - File:Line: `src/lib/components/cardCanvas.svelte:1677`, `src/lib/components/cardCanvas.svelte:1686`, `src/lib/components/cardCanvas.svelte:1695`
  - Evidence excerpt:
    - `removeEventListener("mouseenter", null)` and similar `null` handlers.
  - Why it matters: Removing listeners with `null` is a no-op; if listeners were attached earlier, cleanup is ineffective and leaks can persist.
  - Recommendation for follow-up agent: Keep stable handler references and remove exact callbacks, or rely on `interact().unset()` only if it fully owns handlers.
  - Risk flag: Medium.

## Adapter/Prerender Risks

- `SC-09`
  - Severity: Low
  - Area: Prerender error policy
  - File:Line: `svelte.config.js:19-29`
  - Evidence excerpt:
    - `handleHttpError` special-cases `"/not-found"` then throws for others.
  - Why it matters: If the route is absent or behavior changes, build failures can occur unexpectedly during prerender fetches.
  - Recommendation for follow-up agent: Confirm intended failure policy and align with actual route map; document rationale.
  - Risk flag: Low (`manual confirmation required`).

- `SC-10`
  - Severity: Low
  - Area: Redundant route config surface
  - File:Line: `src/routes/+layout.server.ts:1-8`
  - Evidence excerpt:
    - `ssr = true`, `csr = true`, `prerender = true` explicitly set.
  - Why it matters: Explicit defaults are valid but add maintenance noise; future intent can be unclear when mixed with per-route overrides.
  - Recommendation for follow-up agent: Keep only non-default exports or add comments explaining why explicit defaults are required.
  - Risk flag: Low.

## Diagnostics Snapshot

- `bun run check`
  - Result: Passes with `0 errors`, `30 warnings` (all from `@apply` CSS parsing in `floaters.svelte`).
- `bun run build`
  - Result: Build succeeds.
  - Notable warning: Native `sharp/libvips` duplicate-class warning appears during build process.
- `bun run lint`
  - Result: Placeholder script currently prints `Lint not configured yet`.

## Svelte Peculiarities Leverage Overview

- Overall posture
  - Current leverage: Moderate.
  - The codebase uses several Svelte-native capabilities correctly (`$state`, `$derived`, `$effect`, actions, transitions, and special elements), but there are still opportunities to align more with idiomatic SvelteKit data and error flows.

- What is already leveraged well
  - Runes adoption is active in core UI surfaces:
    - `src/routes/+page.svelte:57` (`$state`), `src/routes/+layout.svelte:56` (`$effect`), `src/lib/components/header.svelte:24` (`$derived.by`).
  - Svelte actions and transitions are used as intended for UI composition:
    - `src/routes/+page.svelte:202-203` (`use:pillAnimation`, `transition:slide`), `src/routes/+page.svelte:187`, `:215`, `:227` (`transition:fade`), `src/lib/components/sharer.svelte:278` (`transition:scale`).
  - `<svelte:window>` is used in multiple components where browser-only events are needed:
    - `src/lib/components/header.svelte:97`, `src/lib/components/mask.svelte:183`, `src/lib/components/cardCanvas.svelte:1736`.
  - `<svelte:head>` is consistently populated per route for metadata:
    - `src/routes/+layout.svelte:103`, `src/routes/+page.svelte:139`, and route pages under `artificial_inquiries`, `data-policy`, `inquirers`, `tedium`.

- Where Svelte/SvelteKit patterns are under-leveraged
  - `SC-11`
    - Severity: Medium
    - Area: SvelteKit server-first data flow
    - File:Line: `src/routes/+page.svelte:108-136`
    - Evidence: Critical homepage data/component are loaded in `onMount` dynamic imports.
    - Why it matters: This defers meaningful content to CSR and underuses SvelteKit `load`/SSR strength.
    - Recommendation for follow-up agent: Shift SEO-critical data to `+page.server.ts`/`+page.ts`; keep only interaction-heavy modules lazy.
    - Risk flag: Medium.
  - `SC-12`
    - Severity: Medium
    - Area: Framework-native redirects/errors
    - File:Line: `src/routes/+error.svelte:6-11`
    - Evidence: Redirect logic in `+error.svelte` via `onMount` and `window.location.href`.
    - Why it matters: This bypasses SvelteKit’s `redirect(...)` flow and is hydration-dependent.
    - Recommendation for follow-up agent: Replace with server-side redirect handling.
    - Risk flag: Medium.
  - `SC-13`
    - Severity: Low
    - Area: Special-element consolidation
    - File:Line: `src/lib/components/header.svelte:97`, `src/lib/components/mask.svelte:183`, `src/lib/components/cardCanvas.svelte:1736`
    - Evidence: Multiple components independently attach window listeners.
    - Why it matters: Valid pattern, but cross-cutting listeners can become fragmented and harder to reason about.
    - Recommendation for follow-up agent: Keep as-is unless event logic grows; then consider centralizing shared viewport/keyboard orchestration in layout/store.
    - Risk flag: Low.
  - `SC-14`
    - Severity: Low
    - Area: Reactivity simplification potential
    - File:Line: `src/routes/+layout.svelte:72-79`
    - Evidence: `$effect` creates timer side-effects without teardown.
    - Why it matters: Runes are used, but cleanup discipline is not fully exploited.
    - Recommendation for follow-up agent: Add effect cleanup function/timeouts cancellation to maximize rune correctness.
    - Risk flag: Low.

## Prioritized Fix Order

1. Move homepage critical data/render path from `onMount` lazy loading to server/client `load` boundaries (`SC-04`).
2. Replace client-only redirect handling in `+error.svelte` with server redirect flow (`SC-02`).
3. Fix `$effect` async cleanup and pending-scroll timeout cancellation in root layout (`SC-06`, `SC-07`).
4. Correct listener teardown in `cardCanvas` by removing actual handler references, not `null` (`SC-08`).
5. Validate or adjust COEP/COOP policy relative to external analytics assets (`SC-05`).
6. Reduce diagnostics noise from Tailwind `@apply` warnings and clean minor route/config maintainability issues (`SC-03`, `SC-09`, `SC-10`, `SC-01`).
