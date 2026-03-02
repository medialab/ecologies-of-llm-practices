<script lang="ts">
    import Logo from "$lib/media/logos/logo_noicon.svg";
    import BurgerIcon from "$lib/media/icons/burgerIcon.svg";
    import CloseIcon from "$lib/media/icons/CloseIcon.svg";
    import { scrollStore } from "$lib/stores/globalStores";
    import { burgerOpen } from "$lib/stores/globalStores";
    import Burger from "$lib/components/burger.svelte";
    import { goto, invalidateAll } from "$app/navigation";
    import { resolve } from "$app/paths";

    let { currentPath } = $props<{
        currentPath: string;
    }>();

    const cyclePages = [
        { path: resolve("/"), label: "Homepage" },
        {
            path: resolve("/artificial_inquiries"),
            label: "Artificial Inquiries",
        },
        { path: resolve("/tedium"), label: "Tedium" },
        { path: resolve("/inquirers"), label: "Co-Inquirers" },
    ];

    const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

    const currentCycleIndex = $derived.by(() => {
        const normalizedPath = normalizePath(currentPath);
        const foundIndex = cyclePages.findIndex(
            ({ path }) => normalizePath(path) === normalizedPath,
        );
        return foundIndex === -1 ? 0 : foundIndex;
    });

    const previousPage = $derived(
        cyclePages[
            (currentCycleIndex - 1 + cyclePages.length) % cyclePages.length
        ],
    );

    const nextPage = $derived(
        cyclePages[(currentCycleIndex + 1) % cyclePages.length],
    );

    const goToPage = async (path: string) => {
        $burgerOpen = false;
        const normalizedTarget = normalizePath(path);
        const normalizedCurrent = normalizePath(currentPath);

        if (normalizedTarget === normalizedCurrent) {
            scrollStore.scrollTo(0);
            await invalidateAll();
            return;
        }

        await goto(path, {
            noScroll: true,
            keepFocus: false,
            invalidateAll: true,
        });
        scrollStore.scrollTo(0);
    };

    const goHome = async (event: MouseEvent) => {
        event.preventDefault();
        await goToPage(resolve("/"));
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
        if (event.key === "Escape" && $burgerOpen) {
            event.preventDefault();
            $burgerOpen = false;
            return;
        }

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

    $effect(() => {
        currentPath;
        $burgerOpen = false;
    });
</script>

<svelte:window onkeydown={handlePageCycleKeys} />

<header
    class="w-screen h-auto items-center justify-between border-[#E5E5E5] md:border-none border-b-[1px] md:pl-6 md:pr-6 p-3 md:grid-cols-2 grid-cols-2 grid bg-white md:bg-transparent z-[160] fixed top-0 md:top-1/2 md:-translate-y-1/2 left-0 max-h-[60px] md:max-h-none md:h-auto"
>
    <div
        id="header_left"
        class="w-full h-auto col-span-1 md:flex flex-row gap-2 hidden"
    >
        <button
            type="button"
            class="hidden md:flex text-2xl leading-none gap-2 bg-white p-1"
            onclick={() => goToPage(previousPage.path)}
            aria-label={`Go to ${previousPage.label}`}
            title={`Go to ${previousPage.label}`}
        >
            <p>←</p>
            <p>{previousPage.label}</p>
        </button>
    </div>
    <a
        id="header_logo"
        href={resolve("/")}
        onclick={goHome}
        class="w-full h-[30px] col-span-1 flex justify-center md:hidden"
    >
        <img src={Logo} alt="Ecologies of LLM Logo" class="h-full w-auto" />
    </a>
    <div
        id="header_right"
        class="w-full md:h-auto h-[28px] col-span-1 flex flex-row gap-2 justify-end"
    >
        <button
            type="button"
            class="hidden md:flex text-2xl leading-none gap-2 bg-white p-1"
            onclick={() => goToPage(nextPage.path)}
            aria-label={`Go to ${nextPage.label}`}
            title={`Go to ${nextPage.label}`}
        >
            <p>{nextPage.label}</p>
            <p>→</p>
        </button>
        <button
            type="button"
            class="h-full w-auto aspect-square cursor-pointer p-1 md:hidden"
            onclick={switchBurger}
            aria-expanded={$burgerOpen}
            aria-label={$burgerOpen ? "Close menu" : "Open menu"}
        >
            {#if $burgerOpen}
                <img src={CloseIcon} alt="" class="h-full w-auto" />
            {:else}
                <img src={BurgerIcon} alt="" class="h-full w-auto" />
            {/if}
        </button>
    </div>
</header>
<Burger></Burger>
