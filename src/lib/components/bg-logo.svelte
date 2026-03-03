<script lang="ts">
    import CircularLogo from "$lib/media/CIRCULAR.png";
    import { isPageLoaded } from "$lib/stores/globalStores";
    import { fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { onMount } from "svelte";

    let html;
    onMount(() => {
        html = document.querySelector("html");
    });

    $effect(() => {
        if ($isPageLoaded && html) {
            html.style.backgroundColor = "#F2F2F2";
        }
    });
</script>

{#if $isPageLoaded}
    <div
        transition:fade={{ duration: 1000, easing: cubicInOut }}
        class="pointer-events-none fixed inset-0 z-[5] grid place-items-center overflow-hidden"
        id="bg_logo"
    >
        <img
            src={CircularLogo}
            alt="Fractal logo"
            class="h-auto w-full object-contain object-center overflow-visible opacity-20"
        />
    </div>
{/if}

<style>
    :global(#bg_logo img) {
        transform-origin: center;
        transform: translateY(calc((var(--progress, 0)) * 200px)) scale(3);
    }

    @media (min-width: 768px) {
        :global(#bg_logo img) {
            transform: translateY(calc((var(--progress, 0)) * -1000px)) scale(1);
        }
    }
</style>
