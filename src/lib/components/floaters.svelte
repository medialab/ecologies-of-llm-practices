<script lang="ts">
    import { onMount, onDestroy, tick } from "svelte";
    import { selectedCard, currentCardColor } from '$lib/stores/globalStores';
    import type { floaterPosition } from "$lib/stores/types";

    let { data, hostElement } = $props();

    let randomPosition = $state<floaterPosition>();
    let holdTimeout = $state<ReturnType<typeof setTimeout> | undefined>();
    let isHolding = $state(false);
    let isClicked = $state(false);
    let isVisible = $state(true);

    // Animation state
    let floaterElement: HTMLElement | undefined = $state();
    let animationState: {
        element: HTMLElement;
        baseX: number;
        baseY: number;
        offsetX: number;
        offsetY: number;
        width: number;
        height: number;
        anchorX: number;
        anchorY: number;
        vx: number;
        vy: number;
        phaseX: number;
        phaseY: number;
        isDragging: boolean;
    } | null = null;
    let animationRafId: number | null = null;
    let animationLastFrame = 0;
    let prefersReducedMotion = false;
    let cleanupAnimation: (() => void) | null = null;
    let interact: typeof import("interactjs").default | null = null;

    const frameInterval = 1000 / 30;
    const paddingTop = 0;
    const paddingRight = 30;

    const calculateRandomPosition = (): floaterPosition => {
        if (typeof window === "undefined") {
            return {
                top: 0,
                left: 0,
                zIndex: 0,
                animationDelay: 0
            };
        }

        const safetyInset = 20;

        let rect = { width: 250, height: 150 };

        if (data && floaterElement) {
            rect = floaterElement.getBoundingClientRect();
        }

        const maxLeft = Math.max(
            window.innerWidth - rect.width - safetyInset,
            safetyInset,
        );
        const maxTop = Math.max(
            window.innerHeight - rect.height - safetyInset,
            safetyInset,
        );

        const left = Math.random() * (maxLeft - safetyInset) + safetyInset;
        const top = Math.random() * (maxTop - safetyInset) + safetyInset;

        return {
            top: Math.round(top),
            left: Math.round(left),
            zIndex: Math.floor(Math.random() * 1000),
            animationDelay: Number(Math.random().toFixed(2)),
        };
    };

    const stopAnimation = () => {
        if (animationRafId) {
            cancelAnimationFrame(animationRafId);
            animationRafId = null;
        }
        animationLastFrame = 0;
    };

    const stepAnimation = (now: number) => {
        if (!animationState) return;

        if (
            animationLastFrame &&
            now - animationLastFrame < frameInterval
        ) {
            animationRafId = requestAnimationFrame(stepAnimation);
            return;
        }

        const delta = animationLastFrame
            ? Math.min(2.2, (now - animationLastFrame) / 16.67)
            : 1;
        animationLastFrame = now;

        if (animationState.isDragging || prefersReducedMotion) {
            animationRafId = requestAnimationFrame(stepAnimation);
            return;
        }

        const speedFactorX = 1 + Math.sin(now * 0.001 + animationState.phaseX);
        const speedFactorY = 1 + Math.cos(now * 0.001 + animationState.phaseY);

        animationState.offsetX += animationState.vx * speedFactorX * delta;
        animationState.offsetY += animationState.vy * speedFactorY * delta;

        let nextX = animationState.baseX + animationState.offsetX;
        let nextY = animationState.baseY + animationState.offsetY;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const minX = -animationState.anchorX;
        const maxX =
            windowWidth - animationState.width - paddingRight - animationState.anchorX;
        const minY = paddingTop - animationState.anchorY;
        const maxY = windowHeight - animationState.height - animationState.anchorY;

        if (nextX < minX || nextX > maxX) {
            animationState.vx *= -1;
            nextX = Math.max(minX, Math.min(nextX, maxX));
            animationState.offsetX = nextX - animationState.baseX;
        }

        if (nextY < minY || nextY > maxY) {
            animationState.vy *= -1;
            nextY = Math.max(minY, Math.min(nextY, maxY));
            animationState.offsetY = nextY - animationState.baseY;
        }

        animationState.element.style.transform = `translate(${nextX}px, ${nextY}px)`;

        animationRafId = requestAnimationFrame(stepAnimation);
    };

    const startAnimation = () => {
        stopAnimation();
        if (!animationState) return;
        animationRafId = requestAnimationFrame(stepAnimation);
    };

    const initAnimation = () => {
        if (!floaterElement) return null;

        const motionMedia = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        prefersReducedMotion = motionMedia.matches;

        const baseX = parseFloat(floaterElement.getAttribute("data-x")) || 0;
        const baseY = parseFloat(floaterElement.getAttribute("data-y")) || 0;
        const rect = floaterElement.getBoundingClientRect();

        animationState = {
            element: floaterElement,
            baseX,
            baseY,
            offsetX: 0,
            offsetY: 0,
            width: rect.width || 250,
            height: rect.height || 150,
            anchorX: rect.left - baseX,
            anchorY: rect.top - baseY,
            vx:
                (Math.random() > 0.5 ? 1 : -1) *
                (0.08 + Math.random() * 0.15),
            vy:
                (Math.random() > 0.5 ? 1 : -1) *
                (0.08 + Math.random() * 0.15),
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            isDragging: false,
        };

        const handleMotionChange = () => {
            prefersReducedMotion = motionMedia.matches;
        };

        motionMedia.addEventListener?.("change", handleMotionChange);
        motionMedia.addListener?.(handleMotionChange);

        startAnimation();

        return () => {
            stopAnimation();
            motionMedia.removeEventListener?.("change", handleMotionChange);
            motionMedia.removeListener?.(handleMotionChange);
            animationState = null;
        };
    };

    // Subscribe to selectedCard store to control visibility
    $effect(() => {
        const currentSelected = $selectedCard;
        if (currentSelected !== "all" && data.parent !== currentSelected) {
            isVisible = false;
        } else {
            isVisible = true;
        }
    });

    const handleOpen = (event: Event) => {
        event.preventDefault();
        if ((data.category === 'image' || data.category === 'video') && data.media) {
            isClicked = true;
        }
    };

    const handleClose = () => {
        isClicked = false;
    };

    const handleMouseDown = (event: MouseEvent) => {
        if (data.category === "document") {
            isHolding = true;
            setTimeout(() => {
                if (isHolding && data.file) {
                    const anchor = document.createElement('a');
                    anchor.href = data.file;
                    anchor.download = data.Title || 'default-file-name';
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                }
                isHolding = false;
            }, 3000);
        }
    };

    const handleMouseUp = () => {
        isHolding = false;
        clearTimeout(holdTimeout);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpen(event);
        }
    };

    onMount(async () => {
        const interactModule = await import("interactjs");
        interact = interactModule.default;

        await tick();

        if (floaterElement) {
            // Calculate random position
            randomPosition = calculateRandomPosition();

            // Initialize animation
            cleanupAnimation = initAnimation();

            // Set initial styles
            floaterElement.classList.add("cursor-grab");
            floaterElement.style.touchAction = "none";
            floaterElement.style.transition = "opacity 0s linear";

            // Fade in
            setTimeout(() => {
                floaterElement.style.opacity = "1";
            }, 1650 + (data.id || 0) * 50);

            floaterElement.style.transformOrigin = "bottom left";

            // Setup interact.js draggable
            if (interact && hostElement) {
                interact(floaterElement).draggable({
                    inertia: {
                        resistance: 20,
                        minSpeed: 80,
                        endSpeed: 10,
                        smoothEndDuration: 400,
                    },
                    listeners: {
                        start(event) {
                            if (!animationState) return;

                            // Bring the floater to the front
                            floaterElement.style.zIndex =
                                String(parseInt(floaterElement.style.zIndex || "1") + 1);

                            // Get current transform values and calculate actual position
                            const computedStyle =
                                window.getComputedStyle(floaterElement);
                            const transform = computedStyle.transform;

                            if (transform && transform !== "none") {
                                const matrix = new DOMMatrix(transform);
                                const currentX = matrix.m41;
                                const currentY = matrix.m42;

                                floaterElement.setAttribute("data-x", String(currentX));
                                floaterElement.setAttribute("data-y", String(currentY));

                                animationState.baseX = currentX;
                                animationState.baseY = currentY;
                            } else {
                                floaterElement.setAttribute("data-x", "0");
                                floaterElement.setAttribute("data-y", "0");
                                animationState.baseX = 0;
                                animationState.baseY = 0;
                            }

                            const rect = floaterElement.getBoundingClientRect();
                            animationState.offsetX = 0;
                            animationState.offsetY = 0;
                            animationState.width = rect.width || animationState.width;
                            animationState.height = rect.height || animationState.height;
                            animationState.anchorX = rect.left - animationState.baseX;
                            animationState.anchorY = rect.top - animationState.baseY;
                            animationState.isDragging = true;

                            event.target.classList.remove("cursor-grab");
                            event.target.classList.add("cursor-grabbing");
                        },

                        move(event) {
                            if (!animationState) return;

                            const x =
                                (parseFloat(
                                    floaterElement.getAttribute("data-x"),
                                ) || 0) + event.dx;
                            const y =
                                (parseFloat(
                                    floaterElement.getAttribute("data-y"),
                                ) || 0) + event.dy;

                            floaterElement.style.transform = `translate(${x}px, ${y}px)`;
                            floaterElement.setAttribute("data-x", String(x));
                            floaterElement.setAttribute("data-y", String(y));

                            animationState.baseX = x;
                            animationState.baseY = y;
                            animationState.offsetX = 0;
                            animationState.offsetY = 0;
                        },

                        end(event) {
                            if (animationState) {
                                animationState.isDragging = false;
                            }
                            event.target.classList.remove("cursor-grabbing");
                            event.target.classList.add("cursor-grab");
                        },
                    },
                    modifiers: [
                        (interact as typeof import("interactjs").default).modifiers?.restrict({
                            restriction: hostElement,
                            endOnly: true,
                        }),
                    ],
                });
            }
        }
    });

    onDestroy(() => {
        if (cleanupAnimation) {
            cleanupAnimation();
            cleanupAnimation = null;
        }

        stopAnimation();

        if (interact && floaterElement) {
            try {
                interact(floaterElement).unset();
            } catch (e) {}
        }

        if (typeof holdTimeout !== "undefined" && holdTimeout) {
            clearTimeout(holdTimeout);
        }
    });
</script>

{#if randomPosition !== undefined && isVisible}
    <div
        bind:this={floaterElement}
        class="floater_container absolute top-1/2 left-[80%] z-[500] flex flex-col gap-0 opacity-0 overflow-hidden cursor-grab touch-none select-none origin-bottom-left transition-[width,opacity] duration-300 ease-in-out w-auto h-auto hidden md:flex"
        class:w-[20vw]={isClicked}
        class:aspect-video={isClicked}
        class:flex-col-reverse={isClicked}
        style="top: {randomPosition.top}px; left: {randomPosition.left}px; z-index: {randomPosition.zIndex}; animation-delay: {randomPosition.animationDelay}s;"
        data-parent={data.parent}
        data-identifier="{data.parent}_{data.id}"
        data-x={randomPosition.left}
        data-y={randomPosition.top}
    >
        {#if data.media && isClicked}
            <div class="max-w-[450px] w-[300px] aspect-[21/9] overflow-hidden grayscale z-[2] relative border-0 opacity-100 transition-opacity duration-300 block h-[85%] w-full border border-dashed border-black">
                {#if data.category === 'image'}
                    <enhanced:img src={data.media} alt="{data.Title} image" class="block w-full h-full overflow-hidden object-cover object-center z-[1]" />
                {:else if data.category === 'video'}
                    <video autoplay muted loop playsinline class="w-full h-full object-cover bg-gray-500">
                        <source src={data.media} type="video/mp4" />
                    </video>
                {/if}
            </div>

            <button
                class="flex absolute right-0 bottom-0 z-[4] w-10 h-10 border border-dashed border-black items-center justify-center p-2 active:brightness-90"
                style="background-color: {$currentCardColor}"
                onclick={handleClose}
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-[30px] h-[30px] fill-black place-self-center">
                    <path d="m256-236-20-20 224-224-224-224 20-20 224 224 224-224 20 20-224 224 224 224-20 20-224-224-224 224Z"/>
                </svg>
            </button>
        {/if}

        <button
            type="button"
            class="inline-flex w-max h-fit px-[var(--spacing-L)] py-[var(--spacing-S)] justify-center items-center gap-0 bg-white text-black border border-dashed border-black leading-[1.2] z-[4] static transition-colors duration-[var(--transition-times)] ease-[var(--transition-curve)] p-[var(--spacing-S)] active:brightness-90 active:scale-[0.97]"
            class:w-full={!isClicked}
            class:active:transform-none={isClicked}
            class:active:filter-none={isClicked}
            style="background-color: {$currentCardColor}"
            aria-label={data.category === 'document' ? `Download ${data.Title || 'document'}` : `Open ${data.Title || 'media item'}`}
            onclick={handleOpen}
            onkeydown={handleKeyDown}
            onmousedown={handleMouseDown}
            onmouseup={handleMouseUp}
            onmouseleave={handleMouseUp}
        >
            {#if data.category === 'document'}
                <div class="block w-5 h-5 fill-black appearance-none border-none bg-transparent p-0 shrink-0 z-[1] static transition-none text-transparent hover:bg-transparent" style="font-family: inherit; line-height: inherit;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z"/>
                    </svg>
                </div>
                <div class="absolute w-full h-full z-[10] bg-black -translate-x-full transition-transform duration-200 ease-in-out supports-[mix-blend-mode:overlay]:mix-blend-overlay supports-[mix-blend-mode:overlay]:opacity-90" class:opacity-35={!isHolding} class:opacity-90={isHolding} class:translate-x-0={isHolding} class:duration-[3000ms]={isHolding}></div>
            {:else if data.category === 'image'}
                <div class="block w-5 h-5 fill-black appearance-none border-none bg-transparent p-0 shrink-0 z-[1] static transition-none text-transparent hover:bg-transparent" style="font-family: inherit; line-height: inherit;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"/>
                    </svg>
                </div>
            {:else if data.category === 'video'}
                <div class="block w-5 h-5 fill-black appearance-none border-none bg-transparent p-0 shrink-0 z-[1] static transition-none text-transparent hover:bg-transparent" style="font-family: inherit; line-height: inherit;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="m172.31-780 70 140h120l-70-140h80l70 140h120l-70-140h80l70 140h120l-70-140h95.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21ZM160-580v327.69q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85V-580H160Zm0 0v340-340Z"/>
                    </svg>
                </div>
            {:else if data.category === 'link'}
                <div class="block w-5 h-5 fill-black appearance-none border-none bg-transparent p-0 shrink-0 z-[1] static transition-none text-transparent hover:bg-transparent" style="font-family: inherit; line-height: inherit;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z"/>
                    </svg>
                </div>
            {/if}

            {#if data.Title}
                <p class="whitespace-nowrap overflow-hidden text-ellipsis block transition-all duration-[var(--transition-times)] ease-[var(--transition-curve)]" class:w-0={!isClicked} class:pl-0={!isClicked} class:w-fit={isClicked} class:pl-[var(--spacing-S)]={isClicked}>
                    {data.Title}
                </p>
            {/if}
        </button>
    </div>
{/if}
