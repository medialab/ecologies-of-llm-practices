<script lang="ts">
    import { burgerOpen } from "$lib/stores/globalStores";
    import { slide, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    const burgerEls = [
        {
            label: "Methodology",
            href: "/#methodology",
        },
        {
            label: "Objective",
            href: "/#objective",
        },
        {
            label: "Playground",
            href: "/#playground",
        },
        {
            label: "Tedium",
            href: "/tedium",
        },
        {
            label: "Co-Inquirers",
            href: "/inquirers",
        },
        {
            label: "Artificial Inquiries",
            href: "/artificial_inquiries",
        },
        {
            label: "Configuration work",
            url: "https://arxiv.org/abs/2512.19189",
        },
    ];

    let appearText = $state(false);

    $effect(() => {
        if ($burgerOpen) {
            setTimeout(() => {
                appearText = true;
            }, 100);
        } else {
            appearText = false;
        }
    });
</script>

{#if $burgerOpen}
    <div
        in:fade={{ duration: 125, easing: cubicInOut }}
        out:fade={{ duration: 125, easing: cubicInOut, delay: 250 }}
        id="burger"
        class="flex flex-col gap-2 h-dvh w-full bg-white z-[150] fixed top-0 left-0 right-0 bottom-0 align-center justify-center"
    >
        {#each burgerEls as el, i}
            <a
                href={el?.href || el?.url}
                target={el?.url ? "_blank" : "_self"}
                class="px-4 pointer-events-auto"
                onclick={() => ($burgerOpen = false)}
            >
                {#if appearText}
                    <h1
                        in:slide={{
                            duration: 300,
                            easing: cubicInOut,
                            delay: i * 50,
                            axis: "y",
                        }}
                        out:slide={{
                            duration: 300,
                            easing: cubicInOut,
                            delay: i * 50,
                            axis: "y",
                        }}
                    >
                        {el.label}
                    </h1>
                {/if}
            </a>
        {/each}
    </div>
{/if}
