# Sync/Async Preloading Report

## Scope
- Analysis-only pass. No app code changes were made.
- Goal: identify blocking sync work, async/defer opportunities, preload/prefetch policy gaps, media loading risk, and font loading correctness.

## Evidence snapshot
- Build: `bun run build` succeeds (static output generated).
- Typecheck: `bun run check` not available (`Script not found "check"`).
- Key scans covered: `preload/prefetch`, `import.meta.glob`, media tags, `await`/`Promise.all`.

## 1) Critical-path map and boundary decisions

### A. App boot and route shell
- Evidence:
  - [src/routes/+layout.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+layout.svelte:3) imports `locomotive-scroll` at module scope.
  - [src/routes/+layout.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+layout.svelte:23) initializes it in `onMount`.
- Finding:
  - `LocomotiveScroll` is loaded for every route before it is needed; this increases initial JS cost.
- Decision:
  - `should defer`: dynamically import inside `onMount` and initialize only on routes that need custom scroll behavior.
- Severity: High
- Risk: Medium

### B. Landing page payload boundary
- Evidence:
  - [src/routes/+page.server.ts](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+page.server.ts:11) imports `cardsDb`, `floatersDb`, `alterEgosDb`.
  - [src/lib/database/config.js](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/database/config.js:3) eagerly imports many images and videos.
  - [src/routes/+page.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+page.svelte:223) renders large card sections immediately.
- Finding:
  - Large data/media graph is coupled to first route load and above-the-fold render path.
- Decision:
  - `must sync`: minimal hero metadata/buttons.
  - `should defer`: large card/floater payload and heavy media-backed sections (post-interaction or post-idle).
- Severity: High
- Risk: High

### C. Optional utility imports on landing
- Evidence:
  - [src/routes/+page.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+page.svelte:5) imports `TurndownService` at module scope, only used by `askAI`.
  - [src/routes/+page.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+page.svelte:4) imports `CardCanvas` at module scope.
- Finding:
  - Non-critical modules are loaded before user intent.
- Decision:
  - `should defer`: dynamically import `turndown` on first ask action; consider lazy mounting/loading for `CardCanvas`.
- Severity: Medium
- Risk: Medium

### D. Non-functional preload signaling in layout server load
- Evidence:
  - [src/routes/+layout.server.ts](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+layout.server.ts:11) returns `{ dependencies: [...] }`.
- Finding:
  - Returning `dependencies` from load does not create browser preload behavior.
- Decision:
  - `should remove/replace`: use real preload hints (head link), or fetch strategy in component/load.
- Severity: Low
- Risk: Low

## 2) Concurrency opportunities

### A. CardCanvas mount sequence contains avoidable serialization
- Evidence:
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1362) `onMount(async...)`
  - sequential `await tick()` at [1365] and [1369], then `await prepareSVG()` at [1383].
- Finding:
  - `prepareSVG` (font fetch/parse/canvas setup) blocks mount completion, even before share action.
- Recommendation:
  - Move `prepareSVG()` behind first share interaction or idle callback.
  - Collapse redundant `tick` waits where possible.
- Severity: High
- Risk: Medium

### B. Async boundary misuse (`await` on non-promise)
- Evidence:
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:379) `await containers;`
- Finding:
  - Adds async indirection without concurrency benefit.
- Recommendation:
  - Remove pseudo-async boundary; keep deterministic sync path here.
- Severity: Low
- Risk: Low

### C. Good existing parallelization
- Evidence:
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:626) uses `Promise.all` for font preloading.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1244) uses `Promise.all` for SVG image preload.
- Finding:
  - These are correct concurrency patterns; keep.
- Severity: Info
- Risk: Low

## 3) `import.meta.glob` and module loading strategy

### A. Eager globs for full image sets
- Evidence:
  - [src/lib/database/media.ts](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/database/media.ts:2) and [src/lib/database/media.ts](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/database/media.ts:12) use `eager: true`.
- Finding:
  - All assets in those globs are bundled/resolved up front for route modules.
- Recommendation:
  - Keep eager only for true above-the-fold media.
  - Switch gallery/archive sets to lazy glob resolution and request per visible item.
- Severity: Medium
- Risk: Medium

### B. Artificial Inquiries media currently imported but not rendered
- Evidence:
  - [src/routes/artificial_inquiries/+page.ts](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/artificial_inquiries/+page.ts:2) imports `artificialInquiriesImgs`.
  - [src/routes/artificial_inquiries/+page.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/artificial_inquiries/+page.svelte:96) media sections are commented out.
- Finding:
  - Route still prepares media payload with no active consumer.
- Recommendation:
  - Defer or remove this load until section is re-enabled.
- Severity: Medium
- Risk: Low

## 4) Media loading policy audit (route/component)

### A. Landing card imagery likely over-eager
- Evidence:
  - [src/lib/components/capitols.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/capitols.svelte:123)
  - [src/lib/components/capitols.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/capitols.svelte:201)
  - No explicit `loading`, `decoding`, `fetchpriority`.
- Finding:
  - Many images can be requested too early on initial route.
- Recommendation:
  - Above-the-fold: `fetchpriority="high"` only for one hero-critical image if needed.
  - Offscreen: `loading="lazy"`, `decoding="async"`, low priority defaults.
- Severity: High
- Risk: High

### B. Tedium gallery/video policy gaps
- Evidence:
  - [src/routes/tedium/+page.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/tedium/+page.svelte:120) gallery `enhanced:img` has no loading/decoding hints.
  - [src/routes/tedium/+page.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/tedium/+page.svelte:141) video lacks explicit `preload`.
- Finding:
  - Potentially heavy media route with no explicit network policy.
- Recommendation:
  - Add explicit video preload policy (`metadata` or `none` unless immediately viewed).
  - Lazy/decode hints for gallery images.
- Severity: Medium
- Risk: Medium

### C. Floater media is interaction-gated (good), but preload attr placement is ineffective
- Evidence:
  - [src/lib/components/floaters.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/floaters.svelte:107) media only rendered when `isClicked`.
  - [src/lib/components/floaters.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/floaters.svelte:98) `data-sveltekit-preload-data="hover"` on a `div`.
- Finding:
  - Interaction gating is good; prefetch attribute on non-link element has no effect.
- Recommendation:
  - Keep media gating.
  - Move preload directives to navigational anchors where intended.
- Severity: Low
- Risk: Low

## 5) Route/module prefetch audit

### A. Global hover-preload enabled
- Evidence:
  - [src/app.html](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.html:13) uses `data-sveltekit-preload-data="hover"` on `<body>`.
- Finding:
  - Aggressive hover prefetch is enabled globally.
- Recommendation:
  - Keep for small internal routes.
  - Consider downgrading to `tap`/route-level control if bandwidth pressure or hover churn is observed.
- Severity: Medium
- Risk: Low

## 6) Font preload, fallback, and payload audit

### A. Preload correctness: valid and matched
- Evidence:
  - Preloads: [src/app.html](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.html:7), [src/app.html](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.html:8), [src/app.html](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.html:9)
  - `@font-face`: [src/app.css](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.css:3), [src/app.css](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.css:11), [src/app.css](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.css:19)
- Finding:
  - `as="font"`, `type="font/woff2"`, `crossorigin` are set; URLs match face declarations.
- Severity: Info
- Risk: Low

### B. `font-display` policy is good; fallback metrics tuning absent
- Evidence:
  - `font-display: swap` at [src/app.css](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.css:8), [src/app.css](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.css:16), [src/app.css](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/app.css:24)
  - Fallback stacks defined in [tailwind.config.js](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/tailwind.config.js:7).
- Finding:
  - FOIT risk is reduced; minor CLS risk may remain without metrics overrides (`size-adjust`, ascent/descent overrides).
- Recommendation:
  - Add metrics-compatible fallback tuning only if CLS measurements justify it.
- Severity: Low
- Risk: Low

### C. Font payload rationalization
- Finding:
  - Current set is compact (sans regular variable range + serif regular + serif italic); not obviously bloated.
  - Italic is preloaded globally though likely non-critical at initial paint.
- Recommendation:
  - Keep current set unless measured contention exists; optional optimization is downgrading italic from preload to normal fetch.
- Severity: Low
- Risk: Low

## 7) Async/Await deep audit

### A. Non-awaited Promise calls in sharing flow
- Evidence:
  - [src/lib/components/sharer.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/sharer.svelte:87) calls `navigator.share(textOnlyPayload)` without `await`.
  - [src/lib/components/sharer.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/sharer.svelte:130) calls `navigator.share(textOnlyPayload)` without `await`.
  - [src/lib/components/sharer.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/sharer.svelte:159) calls `navigator.clipboard.writeText(linkToCopy)` without `await`.
- Finding:
  - Errors can escape local `try/catch`; UI state may update before operation is resolved/rejected.
- Recommendation:
  - Await these calls and handle rejection explicitly; keep optimistic UI only if intentionally fire-and-forget.
- Severity: High
- Risk: Medium

### B. Async declarations/no-op awaits that add complexity without concurrency value
- Evidence:
  - [src/routes/+layout.server.ts](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/routes/+layout.server.ts:11) `load = async` but contains no await.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:379) `await containers;` where `containers` is not a Promise.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1532) repeated `await containers;` on non-Promise.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:423) `containers.forEach(async ...)` with no awaited work inside.
- Finding:
  - Async boundaries are misleading and make execution order harder to reason about.
- Recommendation:
  - Convert to sync where no real async dependency exists; use `for...of` only when real awaited work is needed.
- Severity: Medium
- Risk: Low

### C. Sequential async chain on mount blocks interactivity
- Evidence:
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1362) `onMount(async...)`.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1363) dynamic import.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1365), [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1369), [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:1383) sequential waits (`tick`, `tick`, `prepareSVG`).
- Finding:
  - This chain delays completion of component setup and can postpone responsive interactions.
- Recommendation:
  - Start independent work concurrently where possible; defer `prepareSVG` to first share action or idle time.
- Severity: High
- Risk: Medium

### D. Timer-driven async flow increases race risk
- Evidence:
  - [src/lib/components/sharer.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/sharer.svelte:43) and following uses nested `setTimeout` chains.
  - [src/lib/components/cardCanvas.svelte](/Users/tommasoprinetti/Documents/ecologies-of-llm-practices/src/lib/components/cardCanvas.svelte:447) and following uses nested timers for state/UI transitions.
- Finding:
  - Deep timeout trees are hard to cancel on unmount and can produce stale updates.
- Recommendation:
  - Centralize timeout handles and clear on teardown; prefer explicit state-machine steps for share/card transitions.
- Severity: Medium
- Risk: Medium

## Prioritized highest-impact wins (for operational follow-up)
1. Fix non-awaited async operations in `sharer.svelte` (`navigator.share`, `clipboard.writeText`) to prevent silent failures and state races.
2. Defer heavy boot imports: lazy-load `locomotive-scroll` in layout and reduce unconditional landing payload from `+page.server.ts`.
3. Defer `CardCanvas` expensive prep (`prepareSVG`) to first share/use and trim redundant `tick`/no-op async barriers.
4. Add explicit media loading policy on large image/video surfaces (especially landing cards and tedium gallery/video).
5. Replace eager `import.meta.glob` where full set is not above the fold; avoid loading inactive route media (Artificial Inquiries).
6. Keep current font preload/faces, then optimize only with measured CLS/network pressure.
