<script lang="ts">
    import Logo from "$lib/media/logos/logo_noicon.svg";
    import BurgerIcon from "$lib/media/icons/burgerIcon.svg";
    import CloseIcon from "$lib/media/icons/CloseIcon.svg";
    import { scrollStore } from "$lib/stores/globalStores";
    import { burgerOpen } from "$lib/stores/globalStores";
    import Burger from "$lib/components/burger.svelte";
    import { goto } from "$app/navigation";

    let { currentPath } = $props<{
        currentPath: string;
    }>();

    const cyclePages = [
        { path: "/tedium", label: "Tedium" },
        { path: "/", label: "Homepage" },
        { path: "/inquirers", label: "Inquirers" },
        { path: "/artificial_inquiries", label: "Artificial Inquiries" },
    ];

    const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

    const currentCycleIndex = $derived.by(() => {
        const normalizedPath = normalizePath(currentPath);
        const foundIndex = cyclePages.findIndex(
            ({ path }) => normalizePath(path) === normalizedPath,
        );
        return foundIndex === -1 ? 1 : foundIndex;
    });

    const previousPage = $derived(
        cyclePages[
            (currentCycleIndex - 1 + cyclePages.length) % cyclePages.length
        ],
    );

    const nextPage = $derived(
        cyclePages[(currentCycleIndex + 1) % cyclePages.length],
    );

    const goToPage = (path: string) => {
        $burgerOpen = false;
        goto(path);
    };

    const isDesktopViewport = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;

    const shouldIgnoreArrowNavigation = (event: KeyboardEvent) => {
        if (
            event.defaultPrevented ||
            event.repeat ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
        ) {
            return true;
        }

        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return false;
        }

        if (target.isContentEditable) {
            return true;
        }

        return Boolean(
            target.closest(
                "input, textarea, select, button, a, video, audio, [contenteditable='true'], [role='textbox']",
            ),
        );
    };

    const handlePageCycleKeys = (event: KeyboardEvent) => {
        if (!isDesktopViewport() || shouldIgnoreArrowNavigation(event)) {
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToPage(previousPage.path);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goToPage(nextPage.path);
        }
    };

    const switchBurger = () => {
        $burgerOpen = !$burgerOpen;
    };
</script>

<svelte:window onkeydown={handlePageCycleKeys} />

<header
    class="w-screen h-fit items-center justify-between border-[#E5E5E5] border-b-[1px] md:pl-6 md:pr-6 p-3 md:grid-cols-3 grid-cols-2 grid bg-white z-[160] fixed top-0 left-0 max-h-[60px] md:max-h-none md:h-fit"
>
    <div
        id="header_left"
        class="w-full h-fit col-span-1 md:flex flex-row gap-2 hidden"
    >
        <button
            type="button"
            class="hidden md:flex text-2xl leading-none"
            onclick={() => goToPage(previousPage.path)}
            aria-label={`Go to ${previousPage.label}`}
            title={`Go to ${previousPage.label}`}
        >
            ←
        </button>
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
        <button
            type="button"
            class="hidden md:flex text-2xl leading-none"
            onclick={() => goToPage(nextPage.path)}
            aria-label={`Go to ${nextPage.label}`}
            title={`Go to ${nextPage.label}`}
        >
            →
        </button>
        <button
            type="button"
            class="h-full w-auto aspect-square cursor-pointer p-1 md:hidden"
            onclick={switchBurger}
            aria-expanded={$burgerOpen}
            aria-label={$burgerOpen ? "Close menu" : "Open menu"}
        >
            {#if $burgerOpen}
                <img
                    src={CloseIcon}
                    alt=""
                    class="h-full w-auto"
                />
            {:else}
                <img
                    src={BurgerIcon}
                    alt=""
                    class="h-full w-auto"
                />
            {/if}
        </button>
    </div>
</header>
<Burger></Burger>
