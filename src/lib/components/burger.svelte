<script lang="ts">
    import { burgerOpen } from "$lib/stores/globalStores";
    import { slide, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { resolve } from "$app/paths";

    const burgerEls = [
        {
            label: "Methodology",
            href: `${resolve("/")}#Methodology`,
        },
        {
            label: "Objective",
            href: `${resolve("/")}#objective`,
        },
        {
            label: "Playground",
            href: `${resolve("/")}#playground`,
        },
        {
            label: "Tedium",
            href: resolve("/tedium"),
        },
        {
            label: "Co-Inquirers",
            href: resolve("/inquirers"),
        },
        {
            label: "Artificial Inquiries",
            href: resolve("/artificial_inquiries"),
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
        class="flex flex-col gap-2 h-screen h-dvh w-full bg-white z-[150] fixed top-0 left-0 right-0 bottom-0 align-center justify-center"
    >
        {#each burgerEls as el, i}
            <a
                href={el?.href || el?.url}
                target={el?.url ? "_blank" : "_self"}
                rel={el?.url ? "noopener noreferrer" : undefined}
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
