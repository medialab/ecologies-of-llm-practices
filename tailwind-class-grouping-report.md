# Tailwind Class Grouping Report

## Scope
- Analysis-only pass for reusable Tailwind class extraction and spacing normalization.
- No source code edits were applied.

## Findings (Prioritized)

### 1) Repeated cross-page container and card patterns
- Severity: High
- Risk: Low (safe extraction)
- Evidence:
  - `fullsize_section justify-center h-fit`
    - `src/routes/artificial_inquiries/+page.svelte:97`
    - `src/routes/artificial_inquiries/+page.svelte:112`
    - `src/routes/tedium/+page.svelte:90`
    - `src/routes/tedium/+page.svelte:109`
    - `src/routes/tedium/+page.svelte:131`
  - `bg-white p-4 md:w-2/3 rounded-xl border-black border-[1px] md:border-0 flex flex-col gap-4`
    - `src/routes/artificial_inquiries/+page.svelte:103`
    - `src/routes/tedium/+page.svelte:98`
  - near-variant with same semantic intent:
    - `src/routes/data-policy/+page.svelte:79`

- Recommendation:
  - Extract into `src/app.css` under `@layer components`.
  - Proposed classes:
    - `.section-fit-center` -> `fullsize_section justify-center h-fit`
    - `.content-card` -> `bg-white p-4 rounded-xl border-black border-[1px] md:border-0 flex flex-col gap-4`
    - Keep width as opt-in modifier (`md:w-2/3`) for pages that need it.

### 2) Repeated CTA row and text alignment wrappers
- Severity: High
- Risk: Low (safe extraction)
- Evidence:
  - `flex md:justify-center bg-white p-2 gap-2 flex-col md:flex-row w-fit`
    - `src/routes/artificial_inquiries/+page.svelte:76`
    - `src/routes/tedium/+page.svelte:57`
  - `md:text-center text-left`
    - `src/routes/artificial_inquiries/+page.svelte:66`
    - `src/routes/artificial_inquiries/+page.svelte:71`
    - `src/routes/tedium/+page.svelte:49`
    - `src/routes/tedium/+page.svelte:54`
    - `src/routes/data-policy/+page.svelte:47`
    - `src/routes/data-policy/+page.svelte:52`

- Recommendation:
  - Extract:
    - `.cta-row-responsive` -> `flex md:justify-center bg-white p-2 gap-2 flex-col md:flex-row w-fit`
    - `.text-responsive-center` -> `md:text-center text-left`

### 3) Repeated labels/icons patterns
- Severity: Medium
- Risk: Low (safe extraction)
- Evidence:
  - `text-nowrap uppercase`
    - `src/routes/artificial_inquiries/+page.svelte:86`
    - `src/routes/tedium/+page.svelte:65`
    - `src/routes/tedium/+page.svelte:74`
    - `src/routes/tedium/+page.svelte:82`
    - `src/routes/data-policy/+page.svelte:61`
    - `src/routes/+page.svelte:199`
    - `src/routes/inquirers/+page.svelte:64`
  - `h-full w-full fill-black`
    - `src/lib/components/sharer.svelte:314`
    - `src/lib/components/sharer.svelte:332`
    - `src/lib/components/sharer.svelte:360`
    - `src/lib/components/sharer.svelte:376`
    - `src/lib/components/sharer.svelte:406`

- Recommendation:
  - Extract:
    - `.label-caps-nowrap` -> `text-nowrap uppercase`
    - `.icon-fill-black` -> `h-full w-full fill-black`
  - Keep conditional/state suffix classes inline (example: `hidden group-hover:block ...` at `src/routes/+page.svelte:275`).

### 4) Repeated horizontal scroll content cluster
- Severity: Medium
- Risk: Low (safe extraction)
- Evidence:
  - `md:p-20 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start`
    - `src/routes/tedium/+page.svelte:117`
    - `src/routes/tedium/+page.svelte:139`

- Recommendation:
  - Extract `.scroll-content-row` with the exact cluster above.

### 5) Invalid/fragile utility usage and override churn
- Severity: High
- Risk: Medium (behavior inconsistencies)
- Evidence:
  - Likely invalid utility:
    - `justify-space-between`
      - `src/lib/components/footer.svelte:59`
      - `src/lib/components/footer.svelte:82`
  - Mixed border width syntaxes:
    - `border-[1px]` in routes vs `border-width-[1px]` in `src/lib/components/sharer.svelte:400`
  - Viewport duplicate patterns:
    - `h-screen h-dvh` (`src/lib/components/burger.svelte:55`)
    - `w-screen w-dvw` + `h-screen h-dvh` (`src/lib/components/mask.svelte:187`)

- Recommendation:
  - Standardize to canonical Tailwind utilities:
    - `justify-between` instead of `justify-space-between`.
    - Prefer one border-width pattern (`border` or `border-[1px]`) across components.
    - Keep dual viewport fallback only where needed; otherwise reduce duplicate width/height declarations.

## Replacement Map (for follow-up operational pass)

### Proposed CSS entrypoint
- `src/app.css` under `@layer components`.

### Mapping
- `.section-fit-center`
  - Replace:
    - `src/routes/artificial_inquiries/+page.svelte:97`
    - `src/routes/artificial_inquiries/+page.svelte:112`
    - `src/routes/tedium/+page.svelte:90`
    - `src/routes/tedium/+page.svelte:109`
    - `src/routes/tedium/+page.svelte:131`
  - Note:
    - `src/routes/data-policy/+page.svelte:69` has extra `md:pb-30 pb-12 max-w-[60%]`; keep those inline.

- `.content-card`
  - Replace:
    - `src/routes/artificial_inquiries/+page.svelte:103`
    - `src/routes/tedium/+page.svelte:98`
    - `src/routes/data-policy/+page.svelte:79` (same base, no `md:w-2/3`)

- `.cta-row-responsive`
  - Replace:
    - `src/routes/artificial_inquiries/+page.svelte:76`
    - `src/routes/tedium/+page.svelte:57`

- `.text-responsive-center`
  - Replace:
    - `src/routes/artificial_inquiries/+page.svelte:66`
    - `src/routes/artificial_inquiries/+page.svelte:71`
    - `src/routes/tedium/+page.svelte:49`
    - `src/routes/tedium/+page.svelte:54`
    - `src/routes/data-policy/+page.svelte:47`
    - `src/routes/data-policy/+page.svelte:52`

- `.label-caps-nowrap`
  - Replace:
    - `src/routes/artificial_inquiries/+page.svelte:86`
    - `src/routes/tedium/+page.svelte:65`
    - `src/routes/tedium/+page.svelte:74`
    - `src/routes/tedium/+page.svelte:82`
    - `src/routes/data-policy/+page.svelte:61`
    - `src/routes/+page.svelte:199`
    - `src/routes/inquirers/+page.svelte:64`
  - Keep inline suffix at `src/routes/+page.svelte:275` due group-state behavior.

- `.icon-fill-black`
  - Replace:
    - `src/lib/components/sharer.svelte:314`
    - `src/lib/components/sharer.svelte:332`
    - `src/lib/components/sharer.svelte:360`
    - `src/lib/components/sharer.svelte:376`
    - `src/lib/components/sharer.svelte:406`

- `.scroll-content-row`
  - Replace:
    - `src/routes/tedium/+page.svelte:117`
    - `src/routes/tedium/+page.svelte:139`

## Variant Safety Analysis

### Safe to extract
- Static utility clusters repeated verbatim with no local state variants:
  - `fullsize_section justify-center h-fit`
  - `bg-white p-4 ... flex flex-col gap-4`
  - `text-nowrap uppercase`
  - `h-full w-full fill-black`

### Unsafe / defer extraction
- Long class strings with many breakpoint + arbitrary selectors in `src/lib/components/capitols.svelte`:
  - High coupling to layout behavior and interaction state.
- Group/state-driven classes in `src/routes/+page.svelte:275`:
  - `hidden group-hover:block ... group-active:block ...`
  - Extracting base + variants together risks behavior drift.

## Spacing Normalization Report

### Frequent spacing tokens
- `gap-2` (15), `p-4` (13), `gap-4` (13), `p-2` (10), `px-4` (6)

### Outliers / inconsistent scale signals
- Arbitrary spacing/position values:
  - `mb-[3vw]` (`src/lib/components/capitols.svelte:81`)
  - `max-md:p-[15px]` (`src/lib/components/capitols.svelte:81`)
  - `mt-[0.1%]` (`src/lib/components/capitols.svelte:93`)
  - `pt-[1%]` (`src/lib/components/capitols.svelte:93`)
  - `mb-[-0.2em]`, `mt-[-0.18em]` (`src/lib/components/capitols.svelte:85`)

### Recommendations
- Standardize page/card spacing with a narrow default scale (`p-2`, `p-4`, `gap-2`, `gap-4`) and document exceptions.
- Move repeated card/container spacing into extracted component classes.
- Keep typographic optical adjustments (negative margin/translate) local unless proven reusable.

## Override/Hierarchy Conflict Notes
- `justify-space-between` appears non-standard and likely not emitted by Tailwind.
- Mixed use of `border`, `border-[1px]`, and `border-width-[1px]` increases churn and visual inconsistency.
- Repeated viewport fallback stacks (`h-screen h-dvh`, `w-screen w-dvw`) should be applied deliberately and consistently.

## Suggested Rollout Order
1. Extract and replace safe repeated clusters in route pages (`section-fit-center`, `content-card`, `cta-row-responsive`, `text-responsive-center`, `label-caps-nowrap`).
2. Extract icon utility cluster in `sharer.svelte` (`icon-fill-black`).
3. Normalize invalid/fragile utilities (`justify-space-between`, border-width variants).
4. Re-audit `capitols.svelte` separately for a dedicated tokenization pass due high arbitrary-value density.
