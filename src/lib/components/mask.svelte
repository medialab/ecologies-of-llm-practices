<script lang="ts">
    import { isPageLoaded } from "$lib/stores/globalStores";
    import { cubicInOut, quadIn } from "svelte/easing";
    import { Tween } from "svelte/motion";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    let { holeSpacing = 13, maskColor = "white", opacity = 1 } = $props();

    const hasLoadedInit = get(isPageLoaded);

    let holeSize = new Tween(hasLoadedInit ? 5 : 0, {
        duration: 3000,
        easing: quadIn,
    });

    let viewBoxWidth = $state(0);
    let viewBoxHeight = $state(0);

    let cols = $derived(Math.ceil(viewBoxWidth / holeSpacing));
    let rows = $derived(Math.ceil(viewBoxHeight / holeSpacing));

    $effect(() => {
        if ($isPageLoaded) {
            holeSize.target = 5;
        }
    });

    onMount(() => {
        viewBoxWidth = window.innerWidth;
        viewBoxHeight = window.innerHeight;
    });
</script>

<section
    id="mask"
    class="fixed inset-0 z-[20] pointer-events-none w-screen h-screen overflow-hidden"
    style:opacity
>
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <mask id="perforated-mask">
                <rect
                    width={viewBoxWidth}
                    height={viewBoxHeight}
                    fill="white"
                />
                <g>
                    {#if $isPageLoaded}
                        {#each Array(rows) as _, r}
                            {#each Array(cols) as _, c}
                                {@const dx = (c - cols / 2) / (cols / 2)}
                                {@const dy = (r - rows / 2) / (rows / 2)}
                                {@const dist = Math.sqrt(dx * dx + dy * dy)}
                                {@const currentHoleSize = Math.max(
                                    0,
                                    Math.min(
                                        5,
                                        (holeSize.current - dist * 1.5) * 4,
                                    ),
                                )}
                                <rect
                                    x={c * holeSpacing}
                                    y={r * holeSpacing}
                                    width={currentHoleSize}
                                    height={currentHoleSize}
                                    fill="black"
                                />
                            {/each}
                        {/each}
                    {/if}
                </g>
            </mask>
        </defs>

        <rect
            width={viewBoxWidth}
            height={viewBoxHeight}
            fill={maskColor}
            mask="url(#perforated-mask)"
        />
    </svg>
</section>
