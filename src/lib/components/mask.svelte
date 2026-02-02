<script lang="ts">
    import { isPageLoaded } from "$lib/stores/globalStores";
    import { quadIn } from "svelte/easing";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let { holeSpacing = 13, maskColor = "white", opacity = 1 } = $props();

    const holeSizeMax = 5;
    const animationDuration = 3000;
    const targetFps = 30;

    let canvasEl: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    let viewWidth = 0;
    let viewHeight = 0;
    let dpr = 1;
    let prefersReducedMotion = false;

    let holes: { x: number; y: number; distFactor: number }[] = [];

    let currentHoleSize = get(isPageLoaded) ? holeSizeMax : 0;
    let rafId: number | null = null;

    const buildGrid = () => {
        if (!viewWidth || !viewHeight) {
            holes = [];
            return;
        }

        const cols = Math.ceil(viewWidth / holeSpacing);
        const rows = Math.ceil(viewHeight / holeSpacing);
        const halfCols = cols / 2;
        const halfRows = rows / 2;
        const next: { x: number; y: number; distFactor: number }[] = [];

        for (let r = 0; r < rows; r += 1) {
            for (let c = 0; c < cols; c += 1) {
                const dx = (c - halfCols) / halfCols;
                const dy = (r - halfRows) / halfRows;
                const dist = Math.sqrt(dx * dx + dy * dy);
                next.push({
                    x: c * holeSpacing,
                    y: r * holeSpacing,
                    distFactor: dist * 1.5,
                });
            }
        }

        holes = next;
    };

    const resizeCanvas = () => {
        if (!canvasEl || !ctx) return;

        viewWidth = window.innerWidth;
        viewHeight = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvasEl.width = Math.ceil(viewWidth * dpr);
        canvasEl.height = Math.ceil(viewHeight * dpr);
        canvasEl.style.width = `${viewWidth}px`;
        canvasEl.style.height = `${viewHeight}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;

        buildGrid();
        drawMask(currentHoleSize);
    };

    const drawMask = (holeSize: number) => {
        if (!ctx) return;

        ctx.clearRect(0, 0, viewWidth, viewHeight);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = maskColor;
        ctx.fillRect(0, 0, viewWidth, viewHeight);

        if (holeSize <= 0) {
            return;
        }

        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "black";

        for (const hole of holes) {
            const rawSize = (holeSize - hole.distFactor) * 4;
            if (rawSize <= 0) continue;
            const size = rawSize > holeSizeMax ? holeSizeMax : rawSize;
            ctx.fillRect(hole.x, hole.y, size, size);
        }

        ctx.globalCompositeOperation = "source-over";
    };

    const animateTo = (target: number) => {
        if (!ctx) return;
        if (Math.abs(target - currentHoleSize) < 0.001) {
            drawMask(currentHoleSize);
            return;
        }

        if (prefersReducedMotion) {
            currentHoleSize = target;
            drawMask(currentHoleSize);
            return;
        }

        const start = performance.now();
        const from = currentHoleSize;
        const delta = target - from;
        const frameInterval = 1000 / targetFps;
        let lastFrame = 0;

        const tick = (now: number) => {
            if (lastFrame && now - lastFrame < frameInterval) {
                rafId = requestAnimationFrame(tick);
                return;
            }

            lastFrame = now;
            const t = Math.min(1, (now - start) / animationDuration);
            const eased = quadIn(t);
            currentHoleSize = from + delta * eased;
            drawMask(currentHoleSize);

            if (t < 1) {
                rafId = requestAnimationFrame(tick);
            }
        };

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
    };

    onMount(() => {
        if (!canvasEl) return;
        ctx = canvasEl.getContext("2d", { alpha: true });
        if (!ctx) return;

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        prefersReducedMotion = media.matches;

        const handleMotionChange = () => {
            prefersReducedMotion = media.matches;
        };

        const handleResize = () => {
            resizeCanvas();
        };

        media.addEventListener?.("change", handleMotionChange);
        media.addListener?.(handleMotionChange);
        window.addEventListener("resize", handleResize, { passive: true });

        resizeCanvas();
        drawMask(currentHoleSize);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener("resize", handleResize);
            media.removeEventListener?.("change", handleMotionChange);
            media.removeListener?.(handleMotionChange);
        };
    });

    $effect(() => {
        holeSpacing;
        maskColor;
        if (ctx) {
            buildGrid();
            drawMask(currentHoleSize);
        }
    });

    $effect(() => {
        if ($isPageLoaded) {
            animateTo(holeSizeMax);
        }
    });
</script>

<section
    id="mask"
    class="fixed inset-0 z-[20] pointer-events-none w-screen h-screen overflow-hidden"
    style:opacity
>
    <canvas bind:this={canvasEl} class="block h-full w-full"></canvas>
</section>
