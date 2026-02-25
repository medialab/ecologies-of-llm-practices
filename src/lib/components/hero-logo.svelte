<script lang="ts">
    import { fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { resolve } from "$app/paths";
    import { scrollStore, isPageLoaded } from "$lib/stores/globalStores";
    import Logo from "$lib/media/logos/logo_noicon.svg";
    import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/state";

    const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

    const goHome = async (event: MouseEvent) => {
        event.preventDefault();
        const homePath = resolve("/");

        if (normalizePath(page.url.pathname) === normalizePath(homePath)) {
            scrollStore.scrollTo(0);
            await invalidateAll();
        } else {
            await goto(homePath, {
                noScroll: true,
                keepFocus: true,
                invalidateAll: true,
            });
            scrollStore.scrollTo(0);
        }
    };
</script>

{#if $isPageLoaded}
    <a
        id="header_logo"
        href={resolve("/")}
        onclick={goHome}
        class="w-auto place-self-center h-[40px] col-span-1 md:flex justify-center hidden bg-white p-2"
        transition:fade={{
                                duration: 600,
                                easing: cubicInOut,
                                delay: 700,
                            }}
    >
        <img src={Logo} alt="Ecologies of LLM Logo" class="h-full w-auto" />
    </a>
{/if}
