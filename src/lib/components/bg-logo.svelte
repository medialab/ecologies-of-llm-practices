<script>
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
        class="z-[5] h-fit w-screen absolute left-0 top-0 overflow-x-hidden overflow-y-visible"
        id="bg_logo"
    >
        <img
            src={CircularLogo}
            alt="Fractal logo"
            class="h-auto w-full md:scale-[1] scale-[2] object-contain object-top pt-80"
        />
    </div>
{/if}
