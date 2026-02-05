<script lang="ts">
    import Logo from "$lib/media/logos/logo_noicon.svg";
    import BurgerIcon from "$lib/media/burgerIcon.svg";
    import CloseIcon from "$lib/media/CloseIcon.svg";
    import { scrollStore } from "$lib/stores/globalStores";
    import { burgerOpen } from "$lib/stores/globalStores";
    import Burger from "$lib/components/burger.svelte";
    import { onMount, tick } from "svelte";
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    let { currentPage, currentPath } = $props<{
        currentPage: "landing" | "tedium";
        currentPath: string;
    }>();

    const landingAnchors = [
        {
            label: "PROJECT",
            href: "#project",
        },
        {
            label: "OBJECTIVE",
            href: "#objective",
        },
        {
            label: "Methodology",
            href: "#Methodology",
        },
        {
            label: "TEDIUM",
            url: "/tedium",
        },
    ];

    const tediumAnchors = [
        {
            label: "ABSTRACT",
            href: "#abstract",
        },
        {
            label: "GALLERY",
            href: "#gallery",
        },
        {
            label: "VIDEO",
            href: "#video",
        },
        {
            label: "HOME",
            url: "/",
        },
    ];

    const inquirersAnchors = [
        {
            label: "CO-INQUIRERS",
            href: "#names",
        },
        {
            label: "RESEARCH TEAM",
            href: "#research_team",
        },
        {
            label: "HOME",
            url: "/",
        },
    ];

    let baseAnchors = $state(landingAnchors);
    let anchors = $state(landingAnchors);

    const filterAnchors = async () => {
        if (typeof document === "undefined") return;
        await tick();
        anchors = baseAnchors.filter((anchor) => {
            if (anchor.href && anchor.href.startsWith("#")) {
                return document.querySelector(anchor.href);
            }
            return true;
        });
    };

    $effect(() => {
        const _ = currentPath;
        if (currentPath === "/inquirers") {
            baseAnchors = inquirersAnchors;
        } else {
            baseAnchors =
                currentPage === "landing" ? landingAnchors : tediumAnchors;
        }
        filterAnchors();
    });

    onMount(() => {
        filterAnchors();
    });

    const switchBurger = () => {
        $burgerOpen = !$burgerOpen;
    };
</script>

<header
    class="w-screen h-fit items-center justify-between border-[#E5E5E5] border-b-[1px] md:pl-6 md:pr-6 p-3 md:grid-cols-3 grid-cols-2 grid bg-white z-[160] fixed top-0 left-0 max-h-[60px] md:max-h-none md:h-fit"
>
    <div
        id="header_left"
        class="w-full h-fit col-span-1 md:flex flex-row gap-2 hidden"
    >
        {#each anchors as anchor, i}
            {#if i < 2}
                {#if anchor.href}
                    <button onclick={() => scrollStore.scrollTo(anchor.href)}>
                        <p
                            transition:slide={{
                                duration: 200,
                                easing: cubicInOut,
                                axis: "y",
                            }}
                        >
                            {anchor.label}
                        </p>
                    </button>
                {:else if anchor.url}
                    <a href={anchor.url}>
                        <p
                            transition:slide={{
                                duration: 200,
                                easing: cubicInOut,
                                axis: "y",
                            }}
                        >
                            {anchor.label}
                        </p>
                    </a>
                {:else}
                    <p
                        transition:slide={{
                            duration: 200,
                            easing: cubicInOut,
                            axis: "y",
                        }}
                    >
                        {anchor.label}
                    </p>
                {/if}
            {/if}
        {/each}
    </div>
    <a
        id="header_logo"
        href="/"
        onclick={() => {
            scrollStore.scrollTo("#main");
            $burgerOpen = false;
        }}
        class="w-full h-[30px] col-span-1 flex justify-center"
    >
        <img src={Logo} alt="Ecologies of LLM Logo" class="h-full w-auto" />
    </a>
    <div
        id="header_right"
        class="w-full md:h-fit h-[28px] col-span-1 flex flex-row gap-2 justify-end"
    >
        {#each anchors as anchor, i}
            {#if i >= 2}
                {#if anchor.href}
                    <button
                        onclick={() => scrollStore.scrollTo(anchor.href)}
                        class="hidden md:flex"
                    >
                        <p
                            transition:slide={{
                                duration: 200,
                                easing: cubicInOut,
                                axis: "y",
                            }}
                        >
                            {anchor.label}
                        </p>
                    </button>
                {:else if anchor.url}
                    <a href={anchor.url} class="hidden md:flex">
                        <p
                            transition:slide={{
                                duration: 200,
                                easing: cubicInOut,
                                axis: "y",
                            }}
                        >
                            {anchor.label}
                        </p>
                    </a>
                {/if}
            {/if}
        {/each}
        <button
            class="h-full w-auto aspect-square cursor-pointer p-1"
            onclick={switchBurger}
        >
            {#if $burgerOpen}
                <img
                    src={CloseIcon}
                    alt="Burger Menu"
                    class="h-full w-auto md:hidden"
                    id="burger_menu"
                    transition:slide={{
                        duration: 200,
                        easing: cubicInOut,
                        axis: "y",
                    }}
                />
            {:else}
                <img
                    src={BurgerIcon}
                    alt="Burger Menu"
                    class="h-full w-auto md:hidden"
                    id="burger_menu"
                    transition:slide={{
                        duration: 200,
                        easing: cubicInOut,
                        axis: "y",
                    }}
                />
            {/if}
        </button>
    </div>
</header>
<Burger></Burger>
