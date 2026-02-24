# Cross Browser Compatibility Report

Scope: focused audit for Safari/WebKit layout issues around header sizing, plus adjacent cross-browser risks.

## What I could and could not test

- I could run static code inspection and build/check locally.
- I could not run real Safari/WebKit in this CLI environment (no Safari automation setup in this repo; no Playwright/Cypress test harness present in `package.json`).

## WebKit findings (Safari / iOS Safari)

- Severity: HIGH | Risk flag: `webkit-fit-content-fixed-header`
  - Location: `src/lib/components/header.svelte:101`
  - Evidence excerpt: header uses `fixed` plus `h-fit` and `max-h-[60px]`.
  - Why this is risky: `height: fit-content` on fixed-positioned containers is known to be less predictable on older/newer WebKit combinations, especially with grid/flex content and dynamic viewport behavior.
  - User symptom match: this can present exactly as “header fills the window” on Safari while looking normal in Chromium.
  - Recommended fix for operational agent:
    - Replace `h-fit` with `h-auto` on header and related fixed wrappers.
    - Keep explicit vertical spacing via padding and (if needed) a fixed minimum/maximum height.
    - Prefer `inset-x-0 top-0` over partial inset declarations for fixed headers.

- Severity: MEDIUM | Risk flag: `webkit-fit-content-propagation`
  - Location: `src/lib/components/header.svelte:105`, `src/lib/components/header.svelte:130`, and global utility usage in `src/app.css:150`, `src/app.css:164`, `src/app.css:168`
  - Evidence excerpt: repeated `h-fit` usage across container and interactive elements.
  - Why this is risky: repeated `fit-content` usage increases chances of compounded layout differences between engines.
  - Recommended fix for operational agent:
    - Normalize critical layout containers to `h-auto` unless there is a strict need for `fit-content`.
    - Keep `h-fit` only for non-critical intrinsic-size elements.

- Severity: MEDIUM | Risk flag: `safari-fixed-overlay-confusion`
  - Location: `src/lib/components/burger.svelte:56`
  - Evidence excerpt: burger overlay uses `fixed` + `h-screen h-dvh` and full-viewport white background.
  - Why this is risky: if burger state gets stuck or focus/click handling differs, Safari can show a full-page white layer that is visually similar to a “header covering everything”.
  - Recommended fix for operational agent:
    - Verify burger close state transitions on iOS Safari specifically.
    - Add a defensive escape (e.g., close on route change and on `Escape`) if not already guaranteed.

## Non-WebKit findings

- Severity: LOW | Risk flag: `scroll-timeline-support-variance`
  - Location: `src/app.css:239`
  - Evidence excerpt: `@supports (animation-timeline: scroll())` gate is used.
  - Why this is risky: support varies by browser version; behavior is already guarded.
  - Recommended fix: keep guard as-is; no blocker.

- Severity: LOW | Risk flag: `new-overflow-values-variance`
  - Location: `src/app.css:38`, `src/routes/tedium/+page.svelte:151`
  - Evidence excerpt: `overflow-clip` appears with `overflow-hidden` fallback nearby.
  - Why this is risky: minor visual differences on older engines.
  - Recommended fix: current fallback pattern is acceptable.

## Build target audit

- Location: `vite.config.js:25`
- Evidence excerpt: build target includes `safari15`.
- Assessment:
  - Good baseline for modern Safari coverage.
  - Does not eliminate engine-specific layout quirks around `fit-content` + `fixed`.

## Tailwind/CSS sizing risk conclusion for the reported bug

- Most likely culprit for your Safari issue: `h-fit` on the fixed header (`src/lib/components/header.svelte:101`).
- Secondary contributor to misdiagnosis: full-screen burger layer (`src/lib/components/burger.svelte:56`).

## Recommended follow-up test plan

- Must-test browsers/devices:
  - Safari on macOS (latest stable).
  - Safari on iOS (current + one older major if possible).
  - Chrome latest.
  - Firefox latest.

- Must-test flows:
  - Initial page load at `/` with header visible.
  - Toggle burger open/close repeatedly on mobile viewport.
  - Navigate across `/`, `/tedium`, `/inquirers`, `/data-policy` and back.
  - Rotate iOS device portrait/landscape while header and burger are visible.
  - Deep-link open from fresh load (new tab) to non-home routes.

- Pass criteria for this bug:
  - Header height remains content-driven (no viewport-height fill).
  - Burger overlay appears only when open and always dismisses cleanly.
