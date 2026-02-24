# Cross Browser Compatibility Report

## Scope and Method

- Project type: SvelteKit + Tailwind + Bun.
- Analysis-only pass (no source edits), with evidence from:
  - Config: `package.json`, `vite.config.js`, `postcss.config.js`, `.svelte-kit/tsconfig.json`
  - Styles/components: `src/app.css`, `src/lib/components/*.svelte`, `src/routes/*.svelte`
  - Media inventory: `src/lib/media`, `static/fonts`
  - Build verification: `bun run build`

---

## WebKit Findings

### High Severity

1. `dvh/dvw` sizing without robust fallback on critical fullscreen surfaces
   - Risk flags: `Severity: High` `Risk: Layout/Sizing` `Engine: WebKit (especially older iOS Safari)`
   - Evidence:
     - `src/lib/components/burger.svelte:55` uses `h-dvh`
     - `src/lib/components/cardCanvas.svelte:1753-1754` uses `w-dvw`, `min-h-dvh`, `h-[100dvh]`
     - `src/lib/components/mask.svelte:187` uses `w-dvw h-dvh`
     - `src/routes/+page.svelte:297` uses `min-h-dvh`
   - Why this is risky:
     - Older Safari/WebKit versions and some embedded webviews can mis-handle `dvh/dvw`, causing cut-off overlays or jumpy viewport changes as browser UI appears/disappears.
   - Mitigation for follow-up agent:
     - Apply layered fallbacks: `min-h-screen`/`h-screen` first, then `min-h-[100dvh]`/`h-[100dvh]` via `@supports (height: 100dvh)` or class ordering.
     - Prefer `inset-0` for fixed overlays and avoid redundant viewport width/height declarations where possible.

2. Primary video route uses `.mov` as the only source
   - Risk flags: `Severity: High` `Risk: Media Playback` `Engine: WebKit and non-WebKit (Windows/Linux browsers especially)`
   - Evidence:
     - `src/routes/tedium/+page.svelte:5` imports `TEDIUM_LIGHT.mov`
     - `src/routes/tedium/+page.svelte:141-150` renders `<video src={tediumVideo}>` with no alternate `<source>`
   - Why this is risky:
     - `.mov` playback support is inconsistent cross-platform. Some browser/OS combinations fail decode or fail hardware acceleration.
   - Mitigation for follow-up agent:
     - Export H.264/AAC `.mp4` as primary, keep `.mov` optional.
     - Use explicit `<source>` ordering with MIME types (`video/mp4`, fallback optional).

### Medium Severity

3. Touch/scroll gesture interaction conflicts likely on iOS
   - Risk flags: `Severity: Medium` `Risk: Input/Scroll Behavior` `Engine: WebKit`
   - Evidence:
     - `src/app.css:163` includes `touch-pan-y` on `.main_container`
     - `src/routes/+layout.svelte:24-37` configures Locomotive Scroll gesture handling (`touchMultiplier`, smooth wheel behavior)
   - Why this is risky:
     - iOS Safari gesture arbitration is sensitive when JS scroll systems and CSS touch-action directives mix; can lead to stutter, locked scroll, or inconsistent inertial behavior.
   - Mitigation for follow-up agent:
     - Validate and simplify touch handling on iOS (reduce overlapping gesture control).
     - Add conditional behavior for iOS where smooth-scroll libraries commonly degrade.

4. Share/copy button binds multiple pointer/touch/click pathways to same action
   - Risk flags: `Severity: Medium` `Risk: Input Duplication` `Engine: WebKit mobile + hybrid pointer browsers`
   - Evidence:
     - `src/lib/components/sharer.svelte:394-397` binds `onclick`, `onpointerdown`, `ontouchstart`, and `onkeydown` to `copyToClipboard`
   - Why this is risky:
     - Some engines fire multiple events for one tap sequence, causing duplicate clipboard writes or duplicated UI feedback.
   - Mitigation for follow-up agent:
     - Consolidate to one primary activation path per interaction model (e.g., click/keyboard), or gate duplicate firing with state/debounce.

---

### Medium Severity

2. Scroll-driven animation without fallback
   - Risk flags: `Severity: Medium` `Risk: Motion/Progressive Enhancement` `Engine: non-WebKit variance (especially Firefox variants)`
   - Evidence:
     - `src/lib/components/footer.svelte:128-130` uses `animation-timeline: scroll(root block)` and `animation-range`
   - Why this is risky:
     - Scroll-linked animation support has historically landed unevenly across engines/versions.
   - Mitigation for follow-up agent:
     - Wrap advanced timeline usage in `@supports`.
     - Add static/fade fallback when unsupported.

3. Typography utilities rely on partially supported text wrapping features
   - Risk flags: `Severity: Medium` `Risk: Typography/Layout Drift` `Engine: non-WebKit + older WebKit`
   - Evidence:
     - `src/app.css:58` uses Tailwind `text-pretty`
     - `src/app.css:155` sets `text-wrap-style: pretty`
     - `src/routes/artificial_inquiries/+page.svelte:106` and `src/routes/tedium/+page.svelte:103` apply `text-pretty`
   - Why this is risky:
     - Unsupported engines ignore these properties; line breaks and rag shape differ by browser.
   - Mitigation for follow-up agent:
     - Keep explicit fallback wrapping (`overflow-wrap`, `hyphens`, conservative widths) before experimental pretty wrapping.

4. `overflow-clip` used in core UI surfaces without explicit fallback
   - Risk flags: `Severity: Medium` `Risk: Clipping/Layout` `Engine: non-WebKit + older WebKit`
   - Evidence:
     - `src/app.css:38` (`#hero-h1`)
     - `src/lib/components/capitols.svelte:22`
     - `src/routes/tedium/+page.svelte:149`
   - Why this is risky:
     - `overflow: clip` support is newer than `overflow: hidden`; unsupported engines may not clip as intended.
   - Mitigation for follow-up agent:
     - Add `overflow-hidden` fallback (or dual declarations) before `overflow-clip`.

5. Blend modes used for color overlays on media
   - Risk flags: `Severity: Medium` `Risk: Visual Fidelity` `Engine: non-WebKit + WebKit differences`
   - Evidence:
     - `src/lib/components/capitols.svelte:120,198` uses `mix-blend-color`
     - `src/lib/components/floaters.svelte:326` uses `mix-blend-overlay`
   - Why this is risky:
     - Blend rendering differs across compositors; can cause unreadable contrast or unexpected tinting.
   - Mitigation for follow-up agent:
     - Add non-blend fallback layer and verify contrast/readability without blend mode.

### Low Severity

6. Engine-specific scrollbar styling in error page
   - Risk flags: `Severity: Low` `Risk: Cosmetic Inconsistency` `Engine: non-Firefox/WebKit`
   - Evidence:
     - `src/routes/+error.svelte:87` uses `scrollbar-width: 0px` (Firefox-specific)
   - Why this is risky:
     - Non-Firefox browsers ignore this rule; visual parity differs.
   - Mitigation for follow-up agent:
     - Add `::-webkit-scrollbar` handling if hidden scrollbars are required.

---

## Build Target and Policy Risks

1. CSS browser targets are declared, but JS compatibility floor is not explicit
   - Risk flags: `Severity: Medium` `Risk: Build Target Drift` `Engine: all`
   - Evidence:
     - `postcss.config.js` sets `overrideBrowserslist` for autoprefixer
     - `vite.config.js` has no explicit `build.target`
     - `.svelte-kit/tsconfig.json` uses `target: "esnext"` (type-check context, not browser transpile guarantee)
   - Why this is risky:
     - CSS prefix policy and JS transpilation floor can diverge, especially for older devices.
   - Mitigation for follow-up agent:
     - Define explicit compatibility policy (minimum Safari/Firefox/Chrome versions).
     - Pin `build.target` to that policy; add legacy strategy only if required by product goals.

2. Font delivery is `woff2`-only
   - Risk flags: `Severity: Low` `Risk: Font Fallback` `Engine: older browsers/devices`
   - Evidence:
     - `src/app.css:5,13,21` and `src/app.html:7-9` use only `.woff2`
     - Media inventory shows no `.woff` fallback in `static/fonts`
   - Why this is risky:
     - Very old browsers without `woff2` support fall back to system fonts.
   - Mitigation for follow-up agent:
     - Add `.woff` fallback only if those older targets are in scope.

---

## Tailwind/CSS Class Compatibility Hotspots

- `h-dvh`, `min-h-dvh`, `w-dvw`, `h-[100dvh]`: modern viewport units; add `vh`/`screen` fallbacks.
- `overflow-clip`: add `overflow-hidden` fallback.
- `text-pretty` and raw `text-wrap-style: pretty`: provide non-experimental wrapping fallback.
- `mix-blend-*`: verify per-engine compositing and keep non-blend fallback.
- `h-screen`/`w-screen` on fixed overlays (`src/lib/components/sharer.svelte:425`): prefer `inset-0` sizing to avoid mobile viewport edge cases.

---

## Recommended Compatibility Test Plan

## Must-Test Pages/Components

- `/` (home): `CardCanvas`, `Capitols`, `Floaters`, `Sharer`, `Mask`
- `/tedium`: main video player and horizontal gallery row
- Global: footer scroll animation, burger overlay, error page modal layout

## Browser/Device Matrix

1. Safari iOS (recent + one older major), real device
   - Validate `dvh/dvw` sections, burger/fullscreen overlays, smooth scrolling, share/copy interactions.
2. Safari macOS (recent)
   - Validate blend overlays, footer animation fallback, floater video playback.
3. Firefox desktop (latest + ESR)
   - Validate `text-pretty` fallback behavior, `animation-timeline` fallback, video source selection.
4. Chromium desktop (latest)
   - Baseline regression check and compare against Firefox/Safari rendering.
5. Android Chrome (recent)
   - Validate touch interactions, clipboard/share behavior, fullscreen layout stability.

## Priority Execution Order

1. Fix media MIME/source fallback issues first (`.webm` typed as mp4, `.mov` single-source route).
2. Add viewport-unit fallbacks on fullscreen/critical containers.
3. Add fallbacks for `overflow-clip`, `text-pretty`, and scroll-driven animation.
4. Normalize pointer/touch event handling on share controls.

